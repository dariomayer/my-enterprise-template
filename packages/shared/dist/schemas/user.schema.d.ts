import { z } from 'zod';
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    name: z.ZodString;
    role: z.ZodEnum<["ADMIN", "USER"]>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    email: string;
    name: string;
    role: "ADMIN" | "USER";
    createdAt: Date;
    updatedAt: Date;
}, {
    id: string;
    email: string;
    name: string;
    role: "ADMIN" | "USER";
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const CreateUserSchema: z.ZodObject<Pick<{
    id: z.ZodString;
    email: z.ZodString;
    name: z.ZodString;
    role: z.ZodEnum<["ADMIN", "USER"]>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "email" | "name">, "strip", z.ZodTypeAny, {
    email: string;
    name: string;
}, {
    email: string;
    name: string;
}>;
export declare const UpdateUserSchema: z.ZodObject<Omit<{
    id: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<["ADMIN", "USER"]>>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, "id" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    name?: string | undefined;
    role?: "ADMIN" | "USER" | undefined;
}, {
    email?: string | undefined;
    name?: string | undefined;
    role?: "ADMIN" | "USER" | undefined;
}>;
export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
