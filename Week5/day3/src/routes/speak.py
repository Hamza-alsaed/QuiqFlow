from fastapi import APIRouter, Form
from fastapi.responses import StreamingResponse
from io import BytesIO
from src.core.config import settings
import openai

router = APIRouter(prefix="/speak", tags=["speak"])
openai.api_key = settings.openai_api_key

@router.post("/", summary="Convert text to speech")
async def speak(text: str = Form(...), language: str = Form("en")):
    """
    Accepts text and optional language code.
    Returns MP3 audio as StreamingResponse.
    """
    try:
        # Call OpenAI TTS
        response = openai.audio.speech.create(
            model="gpt-4o-mini-tts",
            voice=language,      # language/voice code, e.g., "en" or "es"
            input=text
        )

        audio_bytes = BytesIO(response.audio)  # Get bytes from API
        audio_bytes.seek(0)

        return StreamingResponse(
            audio_bytes,
            media_type="audio/mpeg",
            headers={"Content-Disposition": f"attachment; filename=text.mp3"}
        )

    except Exception as e:
        return {"success": False, "error": str(e)}
