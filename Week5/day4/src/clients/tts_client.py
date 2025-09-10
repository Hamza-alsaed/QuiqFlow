import openai
from io import BytesIO
from src.core.config import settings

class TTSClient:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            openai.api_key = settings.openai_api_key
            cls._instance = super().__new__(cls)
        return cls._instance

    async def speak(self, text: str, language: str = "en"):
        tts_response = openai.audio.speech.create(
            model="gpt-4o-mini-tts",
            voice=language,
            input=text
        )
        audio_bytes = BytesIO(tts_response.audio)
        audio_bytes.seek(0)
        return audio_bytes
