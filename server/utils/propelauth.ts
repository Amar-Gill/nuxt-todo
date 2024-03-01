import { initAuth } from '@propelauth/cloudflare-worker';

export const usePropelAuth = () => {
  const {
    auth: { url: authUrl, apiKey, verifierKey },
  } = useRuntimeConfig(useEvent());

  return initAuth({
    authUrl,
    apiKey,
    verifierKey,
  });
};
