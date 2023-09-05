import { drizzle } from "drizzle-orm/libsql";
import { migrate } from "drizzle-orm/libsql/migrator";
import { createClient } from "@libsql/client";

const tursoDbUrl = "file:./server/sqlite.db";
const tursoDbToken = "";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    tursoDbUrl,
    tursoDbToken,
    public: {
      authUrl: "",
    },
  },
  hooks: {
    async "build:before"() {
      if (process.env.NODE_ENV === "development") {
        console.info("Skipping database migrations in development mode");
        console.info("Use db:push command to apply migrations");
        return;
      }

      console.info("Migrating database...");

      const client = createClient({
        url: process.env.NUXT_TURSO_DB_URL ?? tursoDbUrl,
        authToken: process.env.NUXT_TURSO_DB_TOKEN ?? tursoDbToken,
      });

      const db = drizzle(client);

      await migrate(db, { migrationsFolder: "./server/migrations" })
        .then(() => console.log("Database migrated"))
        .catch(console.error);
    },
  },
});
