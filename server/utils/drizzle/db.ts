import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const runtimeConfig = useRuntimeConfig();

const client = createClient({
  url: runtimeConfig.tursoDbUrl,
  authToken: runtimeConfig.tursoDbToken,
});

export const db = drizzle(client);
