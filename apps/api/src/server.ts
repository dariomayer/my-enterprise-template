import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.config';
import { logger } from './config/logger';
import { requestIdMiddleware } from './middlewares/request-id.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import routes from './routes';

const app = express();

// ── Security Middleware ──────────────────────────────────────────────

// Unique request ID for audit trails (must be first)
app.use(requestIdMiddleware);

// HTTP security headers (XSS, clickjacking, MIME sniffing, etc.)
app.use(helmet());

// CORS — whitelist-based, driven by CORS_ORIGIN env variable
const allowedOrigins = env.CORS_ORIGIN.split(',').map((o) => o.trim());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., server-to-server, curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Rate limiting — prevent brute-force and DDoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' },
});
app.use(limiter);

// Body parsing — with size limit to prevent payload bombing (DoS)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Disable X-Powered-By to avoid exposing the tech stack
app.disable('x-powered-by');

// ── Routes ───────────────────────────────────────────────────────────

app.use(routes);

// ── Error Handling ───────────────────────────────────────────────────

app.use(errorMiddleware);

// ── Server Startup ───────────────────────────────────────────────────

const server = app.listen(env.PORT, () => {
  logger.info(`🚀 API Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});

// Graceful shutdown — cleanly close connections
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

// Catch unhandled rejections — prevent silent crashes
process.on('unhandledRejection', (reason) => {
  logger.fatal({ reason }, 'Unhandled promise rejection — shutting down');
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  logger.fatal({ error }, 'Uncaught exception — shutting down');
  process.exit(1);
});
