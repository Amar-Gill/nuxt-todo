export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path === "/login") return;

  if (process.server) return;

  const authClient = useAuthClient();
  const auth = await authClient.getAuthenticationInfoOrNull();

  if (!auth) {
    if (to.path !== "/unauthorized") {
      return navigateTo("/unauthorized");
    }
  }
});
