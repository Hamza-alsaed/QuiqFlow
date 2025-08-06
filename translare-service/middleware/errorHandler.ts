import { Request, Response, NextFunction } from 'express';

/**
 * Global error-handling middleware for Express.
 *
 * This function catches any errors thrown in the app, logs them for debugging,
 * and sends a structured JSON response to the client.
 *
 * @param err - The error object (can be any type)
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction (required to complete middleware signature)
 */
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Log the error details to the console (useful for debugging during development)
  console.error(err);

  // Determine the status code to return (default is 500: Internal Server Error)
  const statusCode = err.statusCode || 500;

  // Use the error's message, or a generic fallback if none provided
  const message = err.message || 'Internal Server Error';

  // Send a structured JSON response
  res.status(statusCode).json({
    success: false,
    message,
  });
}
