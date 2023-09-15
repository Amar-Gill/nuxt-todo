import { initAuth } from "@propelauth/cloudflare-worker";

const { authUrl, authApiKey, authVerifierKey } = useRuntimeConfig();

export default initAuth({
  authUrl,
  apiKey: authApiKey,
  verifierKey: authVerifierKey,
});
