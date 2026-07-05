import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // TODO: Implement actual JWT validation logic using env.JWT_SECRET
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    logger.warn('Unauthorized access attempt');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
};
