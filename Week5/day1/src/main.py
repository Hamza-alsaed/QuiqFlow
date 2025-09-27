from fastapi import FastAPI
from src.routes import transcribe

app = FastAPI(title="Week5 Day1 - Audio Transcription")

# Register routes
app.include_router(transcribe.router)

@app.get("/")
def root():
    return {"message": "Welcome to Audio Transcription API"}
