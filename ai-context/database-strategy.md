# Database Strategy

This boilerplate is designed to be database-agnostic through the use of Prisma and the Repository Pattern.

## Switching Database Engines
By default, the project uses PostgreSQL. To switch to MongoDB or MySQL:

1. Update the `datasource db` provider in `apps/api/prisma/schema.prisma`.
2. Update the `docker-compose.yml` and `docker-compose.prod.yml` with the corresponding database image.
3. Because the business logic only communicates with repositories (`BaseRepository`), you only need to ensure the Prisma client generates the correct engine types.
4. If a NoSQL database requires non-relational query structures, extend the specific repository (e.g., `UserRepository`) rather than modifying the core service logic.
