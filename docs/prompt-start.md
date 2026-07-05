# MISSION & ROLE
Act as a Principal Software Architect and DevOps Engineer. Your mission is to generate a complete, enterprise-grade, highly scalable, and secure Full-Stack Web Application Boilerplate (Template) within a Monorepo workspace.

This template will serve as the core foundation for all future web applications built by the user. Every architectural decision must prioritize cleanliness, extreme customizability, zero-technical-debt, strict type safety, and 100% MIT-licensed open-source dependencies.

---

## 1. CORE TECHNICAL STACK
- **Architecture:** Monorepo using `pnpm workspaces` (or Turborepo) with clean modular separation.
- **Frontend (`/apps/web`):** React 18+, Vite, TypeScript, Tailwind CSS, Shadcn/ui, Lucide Icons.
- **Backend (`/apps/api`):** Node.js, Express, TypeScript, Zod (for runtime validation), Pino (for structured JSON logging).
- **Shared (`/packages/shared`):** Shared TypeScript interfaces, DTOs, and Zod validation schemas used across Frontend and Backend.
- **Database Architecture:** Prisma ORM integrated within a strict **Repository Pattern**. Must include configuration adapters and documentation to seamlessly switch engines between PostgreSQL, MySQL, SQLite, and MongoDB.

---

## 2. ARCHITECTURAL PILLARS & REQUIREMENTS

### A. White-Label Theming & Styling (Extreme Customizability)
- Centralize all design tokens (colors, typography, spacing, border-radii) in a single configuration file (`/apps/web/src/config/theme.config.ts` paired with `globals.css`).
- Adapting the template for a brand new website must require modifying ONLY this centralized theme configuration.

### B. Security & Privacy by Design (GDPR Compliant)
- **API Security:** Pre-configure `helmet`, CORS with whitelist support, rate-limiting (`express-rate-limit`), and secure JWT/Session authentication middleware.
- **Input Validation:** 100% of incoming API requests must be validated against Zod schemas from `/packages/shared`.
- **Privacy/GDPR:** Include a modular, opt-in Cookie Consent component on the frontend and stubbed GDPR compliance endpoints on the backend (e.g., `/api/v1/privacy/export` and `/api/v1/privacy/delete`).

### C. Fail-Fast Environment Validation
- Implement strict environment variable validation at application startup using Zod. If required variables (DB connection, JWT secret, environment flags) are missing or invalid, the app must immediately throw a descriptive error and exit.

### D. Production-Ready Docker & DevOps
- Provide optimized, multi-stage `Dockerfile`s for both web and api services ensuring minimal production image sizes (using `node:lts-alpine`).
- Provide a `docker-compose.yml` for local development (including containerized PostgreSQL/MongoDB services) and a `docker-compose.prod.yml` ready for production deployment.

### E. Versioning, Changelog & Git Automation
- Configure `Standard Version` or `Changesets` with Conventional Commits (`commitlint` + `husky` pre-commit hooks).
- Create helper scripts (`package.json` scripts or standalone bash scripts in `/scripts`) to automate git workflows: staging, linting, generating automated `CHANGELOG.md`, bumping versions according to SemVer, and tagging git commits.

---

## 3. PROJECT DIRECTORY STRUCTURE
Generate the project strictly following this layout structure:

```text
/my-enterprise-template
├── .git/
├── .github/workflows/         # CI/CD workflows (build, test, lint)
├── scripts/                   # Automated Git & release automation scripts
├── docs/                      # Human-readable architectural documentation
├── ai-context/                # AI IDE Context & Knowledge Base (CRITICAL)
│   ├── rules.md               # Global rules, coding standards, MIT constraints
│   ├── styling-guide.md       # How to modify themes, Shadcn components, Tailwind
│   ├── backend-architecture.md# Controller-Service-Repository pattern explanation
│   └── database-strategy.md   # Step-by-step guide on switching DB engines
├── packages/
│   └── shared/                # Zod schemas, shared DTOs, common utils
├── apps/
│   ├── web/                   # Vite + Shadcn Frontend
│   │   ├── src/
│   │   │   ├── config/        # Centralized theme & app configs
│   │   │   ├── components/    # Shadcn UI & custom modular components
│   │   │   ├── hooks/
│   │   │   ├── services/      # Typed API client wrappers
│   │   │   └── App.tsx
│   │   └── Dockerfile
│   └── api/                   # Express + Node Backend
│       ├── src/
│       │   ├── config/        # Env validation & logger setup
│       │   ├── controllers/   # Route handler logic
│       │   ├── services/      # Core business logic
│       │   ├── repositories/  # DB abstraction layer (Prisma/Mongo implementations)
│       │   ├── middlewares/   # Auth, error handling, rate limiting
│       │   └── server.ts
│       └── Dockerfile
├── docker-compose.yml         # Local development environment
├── docker-compose.prod.yml    # Production container architecture
├── package.json               # Root workspace scripts
└── pnpm-workspace.yaml