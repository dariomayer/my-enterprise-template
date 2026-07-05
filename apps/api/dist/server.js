"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_config_1 = require("./config/env.config");
const logger_1 = require("./config/logger");
const request_id_middleware_1 = require("./middlewares/request-id.middleware");
const error_middleware_1 = require("./middlewares/error.middleware");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// ── Security Middleware ──────────────────────────────────────────────
// Unique request ID for audit trails (must be first)
app.use(request_id_middleware_1.requestIdMiddleware);
// HTTP security headers (XSS, clickjacking, MIME sniffing, etc.)
app.use((0, helmet_1.default)());
// CORS — whitelist-based, driven by CORS_ORIGIN env variable
const allowedOrigins = env_config_1.env.CORS_ORIGIN.split(',').map((o) => o.trim());
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g., server-to-server, curl)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
// Rate limiting — prevent brute-force and DDoS
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { message: 'Too many requests, please try again later.' },
});
app.use(limiter);
// Body parsing — with size limit to prevent payload bombing (DoS)
app.use(express_1.default.json({ limit: '10kb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10kb' }));
// Disable X-Powered-By to avoid exposing the tech stack
app.disable('x-powered-by');
// ── Routes ───────────────────────────────────────────────────────────
app.use(routes_1.default);
// ── Error Handling ───────────────────────────────────────────────────
app.use(error_middleware_1.errorMiddleware);
// ── Server Startup ───────────────────────────────────────────────────
const server = app.listen(env_config_1.env.PORT, () => {
    logger_1.logger.info(`🚀 API Server running on port ${env_config_1.env.PORT} in ${env_config_1.env.NODE_ENV} mode`);
});
// Graceful shutdown — cleanly close connections
process.on('SIGTERM', () => {
    logger_1.logger.info('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        logger_1.logger.info('HTTP server closed');
        process.exit(0);
    });
});
process.on('SIGINT', () => {
    logger_1.logger.info('SIGINT signal received: closing HTTP server');
    server.close(() => {
        logger_1.logger.info('HTTP server closed');
        process.exit(0);
    });
});
// Catch unhandled rejections — prevent silent crashes
process.on('unhandledRejection', (reason) => {
    logger_1.logger.fatal({ reason }, 'Unhandled promise rejection — shutting down');
    process.exit(1);
});
process.on('uncaughtException', (error) => {
    logger_1.logger.fatal({ error }, 'Uncaught exception — shutting down');
    process.exit(1);
});
