# src/routes/transcribe.py
from fastapi import APIRouter, UploadFile, File
from src.clients.whisper_client import WhisperClient
import os

router = APIRouter(prefix="/transcribe", tags=["transcribe"])
ALLOWED_EXTENSIONS = {"mp3", "wav"}

whisper_client = WhisperClient()

@router.post("/")
async def transcribe(file: UploadFile = File(...)):
    ext = file.filename.split(".")[-1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        return {"success": False, "error": f"Invalid file type: .{ext}"}

    tmp_file_path = f"temp_{file.filename}"
    try:
        with open(tmp_file_path, "wb") as buffer:
            buffer.write(await file.read())

        text_output = await whisper_client.transcribe(tmp_file_path)
        return {"success": True, "text": text_output}
    except Exception as e:
        return {"success": False, "error": str(e)}
    finally:
        if os.path.exists(tmp_file_path):
            os.remove(tmp_file_path)
