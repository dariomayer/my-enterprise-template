# Deployment e Produzione

Il template include configurazioni pronte per l'ambiente di produzione basate su Docker.

## Docker in Produzione

Per compilare ed avviare l'intero stack in un ambiente simile alla produzione locale:

```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

Questo comando avvia:
1. Il database **PostgreSQL** in un container dedicato.
2. L'applicazione **API (Backend)** compilata in ambiente production, connessa al container DB.
3. L'applicazione **Web (Frontend)** servita da un server **Nginx** ottimizzato sulla porta 80.

## Strategia Multi-Stage Build

Entrambi i `Dockerfile` (`apps/web/Dockerfile` e `apps/api/Dockerfile`) utilizzano build multi-stage per ridurre drasticamente la dimensione dell'immagine finale:
- Nella fase di **builder** vengono installate le dipendenze complete e viene effettuata la compilazione TypeScript (`tsc`).
- Nella fase finale di produzione per l'API, vengono importate solo le dipendenze `node_modules` di produzione (`pnpm install --prod`) e i file JavaScript compilati in `/dist`.
- Per il frontend Web, l'immagine finale è basata su `nginx:alpine` e contiene esclusivamente gli asset statici ottimizzati generati da Vite in `/dist`.
