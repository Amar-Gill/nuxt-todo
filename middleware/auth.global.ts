export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path === '/login') return;

  if (process.server) return;

  const { fetchAuth } = useAuth();

  const isLoggedIn = await fetchAuth();

  if (!isLoggedIn) {
    if (to.path !== '/unauthorized') {
      return navigateTo('/unauthorized');
    }
  }
});
