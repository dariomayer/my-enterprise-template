"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const database_1 = require("../config/database");
/**
 * Abstract Base Repository implementing the Repository Pattern.
 * All entity-specific repositories must extend this class.
 *
 * This layer decouples business logic (services) from the ORM (Prisma),
 * making it possible to swap database engines without touching service code.
 */
class BaseRepository {
    db = database_1.prisma;
}
exports.BaseRepository = BaseRepository;
