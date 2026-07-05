import { Request, Response } from 'express';
import { logger } from '../config/logger';

export const healthCheck = (req: Request, res: Response) => {
  logger.info('Health check requested');
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
};
