import { AuthenticationInfo } from "@propelauth/javascript";

export const useAuth = () => {
  const authClient = useAuthClient();

  const auth = ref<AuthenticationInfo | null>(null);
  const fetchingAuth = ref(false);

  const fetchAuth = async () => {
    fetchingAuth.value = true;
    try {
      auth.value = await authClient.getAuthenticationInfoOrNull();
    } catch (e) {
      console.error(e);
    } finally {
      fetchingAuth.value = false;
    }
    return !!auth.value;
  };

  if (!auth.value) fetchAuth();

  return { auth, authClient, fetchAuth, fetchingAuth };
};
