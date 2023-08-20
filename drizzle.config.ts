import type { Config } from "drizzle-kit";

export default {
  schema: "./server/utils/drizzle/schema.ts",
  out: "./drizzle",
  driver: "libsql",
  dbCredentials: {
    url: process.env.TURSO_DB_URL ?? "file:./server/sqlite.db",
  },
} satisfies Config;
