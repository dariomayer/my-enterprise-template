import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(2).max(100),
  role: z.enum(['ADMIN', 'USER']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateUserSchema = UserSchema.pick({ email: true, name: true });
export const UpdateUserSchema = UserSchema.partial().omit({ id: true, createdAt: true, updatedAt: true });

export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
