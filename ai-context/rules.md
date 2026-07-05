# Global Rules & Constraints

1. **Monorepo Architecture**: This project uses pnpm workspaces. All shared code must reside in `/packages`.
2. **Type Safety**: TypeScript is mandatory across all projects. Use `zod` for runtime validation.
3. **MIT License**: All dependencies added must have an MIT (or compatible permissive) license.
4. **Clean Code**: Follow SOLID principles. Use the controller-service-repository pattern in the backend.
5. **Fail-Fast**: Ensure environment variables are validated at startup. Missing vars should crash the app early.
