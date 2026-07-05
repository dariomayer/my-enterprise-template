import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.config';
import { logger } from './config/logger';
import { healthCheck } from './controllers/health.controller';
import { exportUserData, deleteUserData } from './controllers/privacy.controller';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({ origin: '*' })); // Configure properly in production

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
});
app.use(limiter);

// Body parsing
app.use(express.json());

// Routes
app.get('/health', healthCheck);

// GDPR Privacy Routes
app.post('/api/v1/privacy/export', exportUserData);
app.delete('/api/v1/privacy/delete', deleteUserData);

// Error Handling
app.use(errorMiddleware);

const server = app.listen(env.PORT, () => {
  logger.info(`🚀 API Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});
