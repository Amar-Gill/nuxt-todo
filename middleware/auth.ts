export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) return;

  const { auth, fetchAuth } = useAuth();

  const isLoggedIn = !!auth.value || (await fetchAuth());

  if (!isLoggedIn) {
    if (to.path !== '/unauthorized') {
      return navigateTo('/unauthorized');
    }
  }
});
