"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = void 0;
const logger_1 = require("../config/logger");
const healthCheck = (req, res) => {
    logger_1.logger.info('Health check requested');
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
};
exports.healthCheck = healthCheck;
