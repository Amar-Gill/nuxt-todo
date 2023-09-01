import { createClient } from "@propelauth/javascript";

export const useAuthClient = () => {
  const {
    public: { authUrl },
  } = useRuntimeConfig();

  return createClient({
    authUrl,
    enableBackgroundTokenRefresh: true,
  });
};
