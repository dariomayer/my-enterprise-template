import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error({ err }, 'Unhandled exception');

  res.status(500).json({
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
