# src/routes/voice_pipeline.py
from fastapi import APIRouter, UploadFile, File, Form, Depends
from fastapi.responses import StreamingResponse
from src.clients.whisper_client import WhisperClient
from src.clients.tts_client import TTSClient
from src.clients.translate_client import TranslateClient
from src.core.deps import get_whisper_client, get_tts_client, get_translate_client
import os, time
from src.routes.transcribe import ALLOWED_EXTENSIONS

router = APIRouter(prefix="/voice-pipeline", tags=["voice-pipeline"])

@router.post("/")
async def voice_pipeline(
    file: UploadFile = File(...),
    target_language: str = Form(...),  # mandatory translation
    whisper_client: WhisperClient = Depends(get_whisper_client),
    tts_client: TTSClient = Depends(get_tts_client),
    translate_client: TranslateClient = Depends(get_translate_client)
):
    start_time = time.time()
    tmp_file_path = f"temp_{file.filename}"

    ext = file.filename.split(".")[-1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        return {"success": False, "error": f"Invalid file type: .{ext}"}

    try:
        # Save audio
        with open(tmp_file_path, "wb") as buffer:
            buffer.write(await file.read())

        # STT
        text_output = await whisper_client.transcribe(tmp_file_path)

        # Translate
        translated_text = await translate_client.translate(text_output, target_language)

        # TTS
        audio_bytes = await tts_client.speak(translated_text, target_language)

        latency = round(time.time() - start_time, 2)
        return StreamingResponse(
            audio_bytes,
            media_type="audio/mpeg",
            headers={
                "X-Latency": str(latency),
                "Content-Disposition": "attachment; filename=output.mp3"
            }
        )
    except Exception as e:
        return {"success": False, "error": str(e)}
    finally:
        if os.path.exists(tmp_file_path):
            os.remove(tmp_file_path)
