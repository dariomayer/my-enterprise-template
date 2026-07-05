"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const logger_1 = require("../config/logger");
const authMiddleware = (req, res, next) => {
    // TODO: Implement actual JWT validation logic using env.JWT_SECRET
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        logger_1.logger.warn('Unauthorized access attempt');
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};
exports.authMiddleware = authMiddleware;
