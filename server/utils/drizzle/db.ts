import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

export const useDb = () => {
  const runtimeConfig = useRuntimeConfig(useEvent());

  const client = createClient({
    url: runtimeConfig.tursoDbUrl,
    authToken: runtimeConfig.tursoDbToken,
  });

  const db = drizzle(client);

  return db;
};
