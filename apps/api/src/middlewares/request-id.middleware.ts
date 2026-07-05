import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

/**
 * Assigns a unique request ID to every incoming request (X-Request-Id header).
 * Critical for security audit trails — allows correlating logs to specific
 * requests across the entire stack.
 */
export const requestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestId = (req.headers['x-request-id'] as string) || randomUUID();
  res.setHeader('X-Request-Id', requestId);

  // Attach to the request object for downstream use
  (req as any).requestId = requestId;

  // Log every request with its unique ID
  logger.info({
    requestId,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  }, 'Incoming request');

  next();
};
