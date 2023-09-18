import { initAuth } from "@propelauth/cloudflare-worker";

const {
  auth: { url: authUrl, apiKey, verifierKey },
} = useRuntimeConfig();

export default initAuth({
  authUrl,
  apiKey,
  verifierKey,
});
