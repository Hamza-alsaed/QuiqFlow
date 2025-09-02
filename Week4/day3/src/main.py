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
