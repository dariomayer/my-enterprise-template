# Enterprise Boilerplate (Template)

Questo è un boilerplate enterprise-grade, altamente scalabile e sicuro strutturato come monorepo utilizzando `pnpm workspaces`.

## Struttura del Progetto

```text
/my-enterprise-template
├── .github/workflows/         # CI/CD workflows
├── scripts/                   # Script di release e Git automation
├── docs/                      # Documentazione architetturale dettagliata
├── ai-context/                # Contesto per gli assistenti AI (Shadcn, backend, db)
├── packages/
│   └── shared/                # DTO, Zod schema e utilità condivisi
├── apps/
│   ├── web/                   # Frontend in React 18+, Vite, TS, Tailwind CSS e Shadcn
│   └── api/                   # Backend in Node.js, Express, TS, Prisma, Zod e Pino
├── docker-compose.yml         # Configurazione DB locale (Postgres, Mongo)
├── docker-compose.prod.yml    # Architettura container di produzione
└── pnpm-workspace.yaml        # Spazio di lavoro monorepo
```

## Prerequisiti

- **Node.js** v20+
- **pnpm** v9+
- **Docker** & **Docker Compose**

## Avvio Rapido

1. **Installazione delle Dipendenze**:
   ```bash
   pnpm install
   ```

2. **Database Locale**:
   Avvia i database (PostgreSQL e MongoDB) via Docker:
   ```bash
   docker-compose up -d
   ```

3. **Generazione del Client Prisma**:
   ```bash
   pnpm --filter @enterprise/api run db:generate
   ```

4. **Avvio in Sviluppo**:
   Avvia sia l'API che la Web App contemporaneamente in modalità hot-reload:
   ```bash
   pnpm run dev
   ```

## Documentazione Dettagliata

Consulta la cartella `docs/` per maggiori dettagli:
- [Guida all'Architettura](./docs/architecture.md)
- [Installazione e Configurazione](./docs/setup.md)
- [Guida al Deployment](./docs/deployment.md)

Per i prompt degli assistenti AI o per le linee guida di sviluppo, consulta la cartella `ai-context/`.
