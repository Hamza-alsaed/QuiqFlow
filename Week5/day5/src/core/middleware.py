import time
import uuid
import logging
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

logger = logging.getLogger("voice-service")
logger.setLevel(logging.INFO)


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        request_id = str(uuid.uuid4())  # correlation ID
        start_time = time.time()

        logger.info(f"[{request_id}] START {request.method} {request.url.path}")

        try:
            response = await call_next(request)
        except Exception as e:
            process_time = (time.time() - start_time) * 1000
            logger.error(
                f"[{request_id}] ERROR {request.method} {request.url.path} "
                f"error={str(e)} completed_in={process_time:.2f}ms"
            )
            raise

        process_time = (time.time() - start_time) * 1000
        logger.info(
            f"[{request_id}] END {request.method} {request.url.path} "
            f"status={response.status_code} completed_in={process_time:.2f}ms"
        )

        response.headers["X-Request-ID"] = request_id
        return response
