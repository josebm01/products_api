import 'dotenv/config';
import { defineConfig } from 'prisma/config';
import { envs } from './src/config/envs.js';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: envs.databaseUrl,
  },
});
