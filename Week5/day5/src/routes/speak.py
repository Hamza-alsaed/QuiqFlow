from fastapi import APIRouter, Form, Depends
from fastapi.responses import StreamingResponse
from src.clients.tts_client import TTSClient
from src.core.deps import get_tts_client

router = APIRouter(prefix="/speak", tags=["speak"])

@router.post("/")
async def speak(
    text: str = Form(...),
    language: str = Form("en"),
    tts_client: TTSClient = Depends(get_tts_client)
):
    try:
        audio_bytes = await tts_client.speak(text, language)
        return StreamingResponse(
            audio_bytes,
            media_type="audio/mpeg",
            headers={"Content-Disposition": "attachment; filename=output.mp3"}
        )
    except Exception as e:
        return {"success": False, "error": str(e)}
