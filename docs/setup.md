# Installazione e Configurazione

## Configurazione delle Variabili d'Ambiente

Crea un file `.env` all'interno di `apps/api/` con il seguente contenuto (o impostalo nel tuo ambiente):

```env
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://postgres:password@localhost:5432/enterprise_dev?schema=public"
JWT_SECRET="tua_chiave_segreta_lunga_almeno_trentadue_caratteri"
```

## Comandi Utili nel Workspace

I seguenti comandi possono essere eseguiti dalla root del progetto:

### Sviluppo
- `pnpm install` - Installa le dipendenze per tutti i moduli.
- `pnpm run dev` - Avvia tutti i progetti in parallelo (web, api, shared in watch mode).
- `pnpm run build` - Compila tutti i progetti.

### Database
- `pnpm --filter @enterprise/api run db:generate` - Rigenera il Client Prisma.
- `pnpm --filter @enterprise/api run db:push` - Applica le modifiche dello schema Prisma direttamente al database locale senza creare migrazioni (comodo in fase di prototipazione).

### Qualità del Codice
- `pnpm run lint` - Esegue ESLint su tutto il monorepo.
- `pnpm run clean` - Pulisce i file compilati (`dist`, `.turbo`, ecc.).
