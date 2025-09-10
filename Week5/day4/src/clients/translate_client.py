import openai
from src.core.config import settings

class TranslateClient:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            openai.api_key = settings.openai_api_key
            cls._instance = super().__new__(cls)
        return cls._instance

    async def translate(self, text: str, target_language: str) -> str:
        try:
            response = openai.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": f"Translate text to {target_language}"},
                    {"role": "user", "content": text}
                ]
            )
            return response.choices[0].message.content
        except Exception as e:
            raise RuntimeError(f"Translation failed: {str(e)}")
