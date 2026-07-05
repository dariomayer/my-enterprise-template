"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSchema = exports.CreateUserSchema = exports.UserSchema = void 0;
const zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    email: zod_1.z.string().email(),
    name: zod_1.z.string().min(2).max(100),
    role: zod_1.z.enum(['ADMIN', 'USER']),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.CreateUserSchema = exports.UserSchema.pick({ email: true, name: true });
exports.UpdateUserSchema = exports.UserSchema.partial().omit({ id: true, createdAt: true, updatedAt: true });
