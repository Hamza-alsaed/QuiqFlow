from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import StreamingResponse
from io import BytesIO
import time
import openai
from src.core.config import settings
from src.routes.transcribe import ALLOWED_EXTENSIONS
import os

router = APIRouter(prefix="/voice-pipeline", tags=["voice-pipeline"])
openai.api_key = settings.openai_api_key

@router.post("/")
async def voice_pipeline(
    file: UploadFile = File(...),
    target_language: str = Form("en")  # language code for translation & TTS
):
    start_time = time.time()
    tmp_file_path = f"temp_{file.filename}"

    # --- Validate file type ---
    ext = file.filename.split(".")[-1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        return {"success": False, "error": f"Invalid file type: .{ext}"}

    # --- Save temp audio ---
    try:
        with open(tmp_file_path, "wb") as buffer:
            buffer.write(await file.read())
    except Exception as e:
        return {"success": False, "error": f"Failed to save file: {str(e)}"}

    # --- STT: Transcribe audio ---
    try:
        with open(tmp_file_path, "rb") as audio_file:
            transcript = openai.Audio.transcriptions.create(
                model=settings.whisper_model,
                file=audio_file
            )
        text_output = transcript.text
    except Exception as e:
        os.remove(tmp_file_path)
        return {"success": False, "error": f"STT failed: {str(e)}"}

    # --- Translate text ---
    try:
        translated = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Translate the text to the target language accurately."},
                {"role": "user", "content": f"Text: {text_output}\nTranslate to {target_language}"}
            ]
        )
        translated_text = translated.choices[0].message.content
    except Exception as e:
        os.remove(tmp_file_path)
        return {"success": False, "error": f"Translation failed: {str(e)}"}

    # --- TTS: Convert translated text → speech ---
    try:
        tts_response = openai.audio.speech.create(
            model="gpt-4o-mini-tts",
            voice=target_language,
            input=translated_text
        )
        audio_bytes = BytesIO(tts_response.audio)
        audio_bytes.seek(0)
    except Exception as e:
        os.remove(tmp_file_path)
        return {"success": False, "error": f"TTS failed: {str(e)}"}
    finally:
        if os.path.exists(tmp_file_path):
            os.remove(tmp_file_path)

    latency = round(time.time() - start_time, 2)
    print(f"[Voice Pipeline] Request latency: {latency}s")  # logging

    return StreamingResponse(
        audio_bytes,
        media_type="audio/mpeg",
        headers={"X-Latency": str(latency), "Content-Disposition": f"attachment; filename=output.mp3"}
    )
