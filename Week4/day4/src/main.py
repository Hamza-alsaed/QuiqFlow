from fastapi import FastAPI
from src.core.config import settings
from src.routes import ping, users, auth
from src.core.middleware import log_requests
from src.core.exceptions import (
    global_exception_handler,
    validation_exception_handler,
    http_exception_handler
)
from fastapi.exceptions import RequestValidationError, HTTPException

app = FastAPI(title=settings.app_name)

# Add middleware
app.middleware("http")(log_requests)

# Include routers
app.include_router(ping.router)
app.include_router(users.router)
app.include_router(auth.router)

# Add global exception handlers
app.add_exception_handler(Exception, global_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(HTTPException, http_exception_handler)

@app.get("/", response_model=dict)
def root():
    return {"app": settings.app_name, "env": settings.app_env}