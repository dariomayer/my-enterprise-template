"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const logger_1 = require("../config/logger");
const errorMiddleware = (err, req, res, next) => {
    logger_1.logger.error({ err }, 'Unhandled exception');
    res.status(500).json({
        message: 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};
exports.errorMiddleware = errorMiddleware;
