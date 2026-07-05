import { PrismaClient } from '@prisma/client';

/**
 * Prisma client singleton.
 * Centralised here to prevent multiple PrismaClient instances
 * being created across repositories (which leaks DB connections).
 */
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
