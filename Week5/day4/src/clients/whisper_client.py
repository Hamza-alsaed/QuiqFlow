import openai
from src.core.config import settings

class WhisperClient:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            openai.api_key = settings.openai_api_key
            cls._instance = super().__new__(cls)
        return cls._instance

    async def transcribe(self, file_path: str, model: str = None):
        model = model or settings.whisper_model
        with open(file_path, "rb") as audio_file:
            transcript = openai.Audio.transcriptions.create(
                model=model,
                file=audio_file
            )
        return transcript.text
