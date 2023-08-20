// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    tursoDbUrl: "file:./server/sqlite.db",
    tursoDbToken: "",
  },
});
