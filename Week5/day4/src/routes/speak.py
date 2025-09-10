# src/routes/speak.py
from fastapi import APIRouter, Form
from fastapi.responses import StreamingResponse
from src.clients.tts_client import TTSClient

router = APIRouter(prefix="/speak", tags=["speak"])
tts_client = TTSClient()

@router.post("/")
async def speak(text: str = Form(...), language: str = Form("en")):
    try:
        audio_bytes = await tts_client.speak(text, language)
        return StreamingResponse(
            audio_bytes,
            media_type="audio/mpeg",
            headers={"Content-Disposition": "attachment; filename=output.mp3"}
        )
    except Exception as e:
        return {"success": False, "error": str(e)}
