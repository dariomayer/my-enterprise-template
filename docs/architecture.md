# Architettura del Sistema

Questo boilerplate adotta un approccio **Monorepo** con separazione netta delle responsabilità.

## Componenti

### 1. Shared Package (`packages/shared`)
Contiene tipi TypeScript, interfacce, DTO (Data Transfer Objects) e schemi di validazione **Zod** condivisi tra frontend e backend. In questo modo le validazioni dei dati in ingresso e l'autocompletamento TypeScript rimangono in perfetta sincronia.

### 2. Backend API (`apps/api`)
Applicazione Node.js con Express scritta in TypeScript.
- **Pattern Repository**: Astrazione dell'accesso al database per consentire un facile passaggio da un database SQL (PostgreSQL, MySQL, SQLite) a uno NoSQL (MongoDB).
- **Logger Pino**: Log strutturati in formato JSON.
- **Validazione Fail-Fast**: Le variabili d'ambiente vengono validate con Zod all'avvio dell'applicazione. Se manca una configurazione critica, il server crasha immediatamente riportando l'errore.
- **Sicurezza**: Middleware preconfigurati tra cui `helmet`, `cors` con whitelist, e `express-rate-limit`.

### 3. Frontend Web (`apps/web`)
Applicazione Single Page Application (SPA) realizzata con React, Vite, TypeScript e Tailwind CSS.
- **Shadcn UI**: Design system customizzabile.
- **White-Labeling**: Tutti i token di design sono centralizzati in `src/config/theme.config.ts` e `src/globals.css`.
