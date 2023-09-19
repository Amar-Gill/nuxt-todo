import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { createClient } from '@libsql/client';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    tursoDbUrl: 'file:./server/sqlite.db',
    tursoDbToken: '',
    auth: {
      url: '',
      apiKey: '',
      verifierKey: '',
    },
    public: {
      authUrl: '',
    },
  },
  hooks: {
    async 'build:before'() {
      if (process.env.NODE_ENV === 'development') {
        console.info('Skipping database migrations in development mode');
        console.info('Use db:push command to apply migrations');
        return;
      }

      console.info('Migrating database...');

      const client = createClient({
        url: process.env.NUXT_TURSO_DB_URL as string,
        authToken: process.env.NUXT_TURSO_DB_TOKEN,
      });

      const db = drizzle(client);

      await migrate(db, { migrationsFolder: './server/migrations' })
        .then(() => console.info('Database migrated'))
        .catch(console.error);
    },
  },
});
