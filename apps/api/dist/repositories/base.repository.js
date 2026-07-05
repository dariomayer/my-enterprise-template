"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = exports.prisma = void 0;
// This is a stub for the BaseRepository pattern
// In a real implementation, this would wrap PrismaClient calls
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
class BaseRepository {
}
exports.BaseRepository = BaseRepository;
