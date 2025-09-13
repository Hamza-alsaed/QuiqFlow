from typing import Optional
import logging
from fastapi import UploadFile
from openai import OpenAI
import openai
from src.core.config import settings

logger = logging.getLogger("voice-service")

class WhisperClient:
    _instance: Optional["WhisperClient"] = None

    def __new__(cls, api_key: str = None):
        if cls._instance is None:
            openai.api_key = settings.openai_api_key
            cls._instance = super().__new__(cls)
            cls._instance.client = OpenAI(api_key=api_key or settings.openai_api_key)
        return cls._instance

    async def transcribe(self, file_path: str) -> str:
        logger.info(f"Transcribing file={file_path}")
        try:
            with open(file_path, "rb") as f:
                transcription = self.client.audio.transcriptions.create(
                    model="whisper-1",
                    file=f
                )
            text = transcription.text
            logger.info(f"Transcription result: {text[:50]}...")
            return text
        except Exception as e:
            logger.error(f"Transcription failed: {str(e)}")
            raise
