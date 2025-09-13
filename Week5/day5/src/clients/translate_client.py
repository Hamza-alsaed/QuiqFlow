from typing import Optional
import openai
from openai import OpenAI
from src.core.config import settings
import logging

logger = logging.getLogger("voice-service")

class TranslateClient:
    _instance: Optional["TranslateClient"] = None

    def __new__(cls, api_key: str = None):
        if cls._instance is None:
            openai.api_key = api_key or settings.openai_api_key
            cls._instance = super().__new__(cls)
            cls._instance.client = OpenAI(api_key=openai.api_key)
        return cls._instance

    async def translate(self, text: str, target_language: str) -> str:
        logger.info(f"Translating text[:50]={text[:50]} → {target_language}")
        try:
            response = openai.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": f"Translate text to {target_language}"},
                    {"role": "user", "content": text}
                ]
            )
            translated = response.choices[0].message.content
            logger.info(f"Translation result[:50]: {translated[:50]}...")
            return translated
        except Exception as e:
            logger.error(f"Translation failed: {str(e)}")
            raise
