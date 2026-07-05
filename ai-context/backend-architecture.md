# Backend Architecture

We follow a strict layered architecture:

1. **Controllers**: Handle incoming HTTP requests, route parameters, and respond to the client. No business logic here.
2. **Services**: Contain the core business logic. They process data and call repositories.
3. **Repositories**: Handle all direct database interactions. This abstracts the ORM away from the services.

## Validation
- All incoming requests must be validated using Zod middlewares.
- DTOs and Zod schemas should be imported from the `@enterprise/shared` package to maintain sync with the frontend.
