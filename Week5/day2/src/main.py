from fastapi import FastAPI
from src.routes import transcribe, speak

app = FastAPI(title="Week5 - Audio Transcription & TTS")

app.include_router(transcribe.router)
app.include_router(speak.router)

@app.get("/")
def root():
    return {"message": "Welcome to Audio API"}
