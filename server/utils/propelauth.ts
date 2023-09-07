import { initBaseAuth } from "@propelauth/node";

const { authUrl, authApiKey } = useRuntimeConfig();

export default initBaseAuth({
  authUrl,
  apiKey: authApiKey,
});
