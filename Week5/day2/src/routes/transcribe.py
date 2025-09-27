from fastapi import APIRouter, UploadFile, File
from src.models.base_response import BaseResponse
from src.core.config import settings
import openai
import shutil
import os

openai.api_key = settings.openai_api_key

router = APIRouter(prefix="/transcribe", tags=["transcribe"])

openai.api_key = settings.OPENAI_API_KEY

ALLOWED_EXTENSIONS = {"mp3", "wav", "m4a"}

@router.post("/", response_model=BaseResponse)
async def transcribe_audio(file: UploadFile = File(...)):
    # Validate file type
    ext = file.filename.split(".")[-1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        return BaseResponse(success=False, error=f"Invalid file type: .{ext}")

    # Save temporarily
    tmp_file_path = f"temp_{file.filename}"
    with open(tmp_file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        # Call OpenAI Whisper
        with open(tmp_file_path, "rb") as audio_file:
            transcript = openai.Audio.transcriptions.create(
                model=settings.MODEL,
                file=audio_file
            )
        text_output = transcript.text
        return BaseResponse(success=True, data={"text": text_output})
    except Exception as e:
        return BaseResponse(success=False, error=str(e))
    finally:
        if os.path.exists(tmp_file_path):
            os.remove(tmp_file_path)
