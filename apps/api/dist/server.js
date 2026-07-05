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
const health_controller_1 = require("./controllers/health.controller");
const error_middleware_1 = require("./middlewares/error.middleware");
const app = (0, express_1.default)();
// Security Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: '*' })); // Configure properly in production
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
});
app.use(limiter);
// Body parsing
app.use(express_1.default.json());
// Routes
app.get('/health', health_controller_1.healthCheck);
// Error Handling
app.use(error_middleware_1.errorMiddleware);
const server = app.listen(env_config_1.env.PORT, () => {
    logger_1.logger.info(`🚀 API Server running on port ${env_config_1.env.PORT} in ${env_config_1.env.NODE_ENV} mode`);
});
// Graceful shutdown
process.on('SIGTERM', () => {
    logger_1.logger.info('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        logger_1.logger.info('HTTP server closed');
        process.exit(0);
    });
});
