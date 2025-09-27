from fastapi import FastAPI
from src.routes import transcribe, speak, voice_pipeline

app = FastAPI(title="Week5 - Full Audio Pipeline")

app.include_router(transcribe.router)
app.include_router(speak.router)
app.include_router(voice_pipeline.router)

@app.get("/")
def root():
    return {"message": "Welcome to Audio Pipeline API"}
