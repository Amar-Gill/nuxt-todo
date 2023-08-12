import type { Config } from "drizzle-kit";

export default {
  schema: "./server/utils/drizzle/schema.ts",
  out: "./drizzle",
  driver: "libsql",
  dbCredentials: {
    url: "file:./server/sqlite.db",
  },
} satisfies Config;
