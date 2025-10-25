<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-warning/5">
    <div class="text-center space-y-6">
      <!-- Loading spinner -->
      <div class="w-16 h-16 mx-auto">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
      
      <!-- Loading message -->
      <div class="space-y-2">
        <h2 class="text-2xl font-bold text-neutral dark:text-white">
          Connexion en cours...
        </h2>
        <p class="text-base-content/70">
          Veuillez patienter pendant que nous vous connectons.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Redirection automatique après connexion OAuth
onMounted(async () => {
  try {
    // Attendre un court délai pour l'effet visuel
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Rediriger vers le dashboard
    await navigateTo('/learning/dashboard', { replace: true });
  } catch (error) {
    console.error('Erreur lors de la redirection:', error);
    // En cas d'erreur, rediriger vers la page d'accueil
    await navigateTo('/', { replace: true });
  }
});

// SEO
useHead({
  title: 'Connexion - Tookan AI',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
});
</script>
