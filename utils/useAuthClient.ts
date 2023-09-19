import { IAuthClient, createClient } from '@propelauth/javascript';

let client: IAuthClient;

export const useAuthClient = () => {
  const {
    public: { authUrl },
  } = useRuntimeConfig();

  return (
    client ??
    (client = createClient({
      authUrl,
      enableBackgroundTokenRefresh: true,
    }))
  );
};
