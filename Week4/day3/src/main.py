from fastapi import FastAPI
from src.core.config import settings
from src.routes import ping, users, auth

app = FastAPI(title=settings.app_name)

# Register routers
app.include_router(ping.router)
app.include_router(users.router)
app.include_router(auth.router)

@app.get("/")
def root():
    return {"app": settings.app_name, "env": settings.app_env}

@app.get("/health/live", tags=["health"])
def liveness_probe():
    """
    Liveness probe – checks if the app process is running.
    """
    return {"status": "alive"}

@app.get("/health/ready", tags=["health"])
def readiness_probe():
    """
    Readiness probe – checks if dependencies are ready.
    For now, just returns ready.
    """
    # In a real app, you could check DB, cache, etc.
    return {"status": "ready"}
