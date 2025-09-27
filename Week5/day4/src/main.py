from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.core.config import settings
from src.routes import transcribe, speak, voice_pipeline

app = FastAPI(title=settings.app_name, debug=settings.app_debug)

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(transcribe.router)
app.include_router(speak.router)
app.include_router(voice_pipeline.router)

# Root endpoint
@app.get("/")
async def root():
    return {
        "app": settings.app_name,
        "env": settings.app_env,
        "status": "running"
    }
