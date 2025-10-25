export default defineNuxtRouteMiddleware((to, from) => {
  // Vérifier si l'utilisateur vient d'une redirection OAuth
  if (to.query.access_token || to.query.refresh_token) {
    // Rediriger immédiatement vers le dashboard
    return navigateTo('/learning/dashboard', { replace: true });
  }
});
