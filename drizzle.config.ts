import type { Config } from 'drizzle-kit';

export default {
  schema: './server/utils/drizzle/schema.ts',
  out: './server/migrations/',
  driver: 'libsql',
  verbose: true,
  dbCredentials: {
    url: process.env.NUXT_TURSO_DB_URL ?? 'file:./server/sqlite.db',
    authToken: process.env.NUXT_TURSO_DB_TOKEN,
  },
} satisfies Config;
