# src/core/middleware.py
import time
from loguru import logger
from fastapi import Request
from starlette.types import ASGIApp, Receive, Scope, Send

# configure logger early in app startup if needed
logger.add("logs/app.log", rotation="10 MB", retention="7 days", enqueue=True)

async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time_ms = round((time.time() - start_time) * 1000, 2)
    logger.info(
        "{method} {path} completed_in={ms}ms status={status}",
        method=request.method,
        path=request.url.path,
        ms=process_time_ms,
        status=response.status_code
    )
    response.headers["X-Process-Time-ms"] = str(process_time_ms)
    return response
