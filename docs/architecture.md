# Architettura del Sistema

Questo boilerplate adotta un approccio **Monorepo** progettato specificamente per massimizzare **modularità** e **scalabilità**.

## Modularità e Scalabilità

La promessa principale di questo template è offrire un'architettura **altamente modulare** e **facilmente scalabile** all'aumentare della complessità del progetto o dei volumi di traffico.

### Modularità (Separazione delle Responsabilità)
- **Monorepo (pnpm workspaces)**: Codice di dominio e configurazioni condivise sono isolati nel package `shared`, pronti per essere consumati sia dal Frontend (`web`) che dal Backend (`api`). Questo garantisce il principio DRY (Don't Repeat Yourself) e una perfetta sincronia tra frontend e backend (es. regole di validazione Zod e tipi TS).
- **Architettura Backend a Livelli**: Il backend adotta una netta separazione Controller -> Service -> Repository. 
  - **Repository Pattern**: Astrae l'accesso ai dati. Passare da un database relazionale (es. PostgreSQL) a uno NoSQL (es. MongoDB) richiede unicamente di iniettare una nuova implementazione del Repository, lasciando del tutto invariata la complessa logica di business nei layer superiori (Service).
- **White-Labeling & UI Frontend**: L'interfaccia utente è basata su componenti modulari (Shadcn UI), permettendo modifiche granulari. Tutti i *design token* (colori, spaziature, tipografia) sono centralizzati in singoli file di configurazione (`theme.config.ts`), rendendo istantaneo il "re-branding" (white-labeling) dell'applicazione.

### Scalabilità
- **Stateless API**: L'API backend è progettata in modalità stateless (es. autenticazione tramite JWT), garantendo la possibilità di scalare orizzontalmente aggiungendo istanze dietro un Load Balancer senza problemi di sessioni.
- **Ecosistema Estensibile (Microservizi-Ready)**: L'architettura a monorepo consente di affiancare nuove applicazioni (es. un worker per processi asincroni, o una dashboard `admin`) condividendo la medesima base di codice, facilitando una futura transizione verso i microservizi.
- **Infrastruttura Containerizzata**: Immagini Docker multi-stage ottimizzate, ideali per auto-scaling rapido su Kubernetes, AWS ECS o architetture Serverless.

## Componenti Principali

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
