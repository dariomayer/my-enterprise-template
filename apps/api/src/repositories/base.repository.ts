import { prisma } from '../config/database';

/**
 * Abstract Base Repository implementing the Repository Pattern.
 * All entity-specific repositories must extend this class.
 *
 * This layer decouples business logic (services) from the ORM (Prisma),
 * making it possible to swap database engines without touching service code.
 */
export abstract class BaseRepository<T> {
  protected db = prisma;

  abstract findAll(): Promise<T[]>;
  abstract findById(id: string): Promise<T | null>;
  abstract create(data: Partial<T>): Promise<T>;
  abstract update(id: string, data: Partial<T>): Promise<T>;
  abstract delete(id: string): Promise<boolean>;
}
