import { Request, Response, NextFunction } from 'express';
import pino from 'pino';
import { env } from '../config';

const logger = pino({ level: env.LOG_LEVEL });

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const requestId = req.id || 'unknown';
  
  logger.error({
    requestId,
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
  }, 'Error occurred');

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      requestId,
    });
    return;
  }

  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    requestId,
  });
};
