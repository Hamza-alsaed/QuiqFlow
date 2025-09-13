# src/core/deps.py
from src.clients.whisper_client import WhisperClient
from src.clients.tts_client import TTSClient
from src.clients.translate_client import TranslateClient
from src.core.config import settings

# Singleton instances
_whisper_client = None
_tts_client = None
_translate_client = None

def get_whisper_client() -> WhisperClient:
    global _whisper_client
    if _whisper_client is None:
        _whisper_client = WhisperClient(api_key=settings.openai_api_key)
    return _whisper_client

def get_tts_client() -> TTSClient:
    global _tts_client
    if _tts_client is None:
        _tts_client = TTSClient(api_key=settings.openai_api_key)
    return _tts_client

def get_translate_client() -> TranslateClient:
    global _translate_client
    if _translate_client is None:
        _translate_client = TranslateClient(api_key=settings.openai_api_key)
    return _translate_client
