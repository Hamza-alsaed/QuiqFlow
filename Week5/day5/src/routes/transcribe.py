from fastapi import APIRouter, UploadFile, File, Depends
from src.clients.whisper_client import WhisperClient
from src.core.deps import get_whisper_client
import aiofiles
import tempfile
import os

router = APIRouter(prefix="/transcribe", tags=["transcribe"])
ALLOWED_EXTENSIONS = {"mp3", "wav"}

@router.post("/")
async def transcribe(file: UploadFile = File(...), whisper_client: WhisperClient = Depends(get_whisper_client)):
    ext = file.filename.split(".")[-1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        return {"success": False, "error": f"Invalid file type: .{ext}"}

    try:
        async with tempfile.NamedTemporaryFile(delete=False, suffix=f".{ext}") as tmp:
            async with aiofiles.open(tmp.name, "wb") as buffer:
                content = await file.read()
                await buffer.write(content)

        text_output = await whisper_client.transcribe(tmp.name)
        return {"success": True, "text": text_output}
    except Exception as e:
        return {"success": False, "error": str(e)}
    finally:
        if "tmp" in locals() and os.path.exists(tmp.name):
            os.remove(tmp.name)
