from typing import Optional
from io import BytesIO
import openai
from openai import OpenAI
from src.core.config import settings
import logging

logger = logging.getLogger("voice-service")

class TTSClient:
    _instance: Optional["TTSClient"] = None

    def __new__(cls, api_key: str = None):
        if cls._instance is None:
            openai.api_key = api_key or settings.openai_api_key
            cls._instance = super().__new__(cls)
        return cls._instance

    async def speak(self, text: str, language: str = "en") -> BytesIO:
        logger.info(f"Synthesizing speech for text[:50]={text[:50]}...")
        try:
            tts_response = openai.audio.speech.create(
                model="gpt-4o-mini-tts",
                voice=language,
                input=text
            )
            audio_bytes = BytesIO(tts_response.audio)
            audio_bytes.seek(0)
            return audio_bytes
        except Exception as e:
            logger.error(f"TTS failed: {str(e)}")
            raise
