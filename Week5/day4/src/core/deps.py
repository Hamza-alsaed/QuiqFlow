from src.clients.whisper_client import WhisperClient
from src.clients.tts_client import TTSClient
from src.clients.translate_client import TranslateClient

def get_whisper_client():
    return WhisperClient()

def get_tts_client():
    return TTSClient()

def get_translate_client():
    return TranslateClient()
