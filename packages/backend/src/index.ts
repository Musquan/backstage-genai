import { createBackend } from '@backstage/backend-defaults';
import samlAuthModule from './plugins/auth';
import winston from 'winston';

async function main() {
  const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
  });

  const backend = createBackend();

  backend.add(import('@backstage/plugin-app-backend'));
  backend.add(import('@backstage/plugin-proxy-backend'));
  backend.add(import('@backstage/plugin-scaffolder-backend'));
  backend.add(import('@backstage/plugin-scaffolder-backend-module-github'));
  backend.add(import('@backstage/plugin-techdocs-backend'));
  backend.add(import('@backstage/plugin-catalog-backend'));
  backend.add(import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model'));
  backend.add(import('@backstage/plugin-catalog-backend-module-logs'));

  backend.add(import('@backstage/plugin-auth-backend'));
  backend.add(samlAuthModule);

  backend.add(import('@backstage/plugin-permission-backend'));
  backend.add(import('@backstage/plugin-permission-backend-module-allow-all-policy'));
  backend.add(import('@backstage/plugin-search-backend'));
  backend.add(import('@backstage/plugin-search-backend-module-pg'));
  backend.add(import('@backstage/plugin-search-backend-module-catalog'));
  backend.add(import('@backstage/plugin-search-backend-module-techdocs'));
  backend.add(import('@backstage/plugin-kubernetes-backend'));

  await backend.start();
}

main().catch(err => {
  console.error('Backend failed to start', err);
  process.exit(1);
});
