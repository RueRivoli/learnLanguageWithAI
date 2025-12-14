<script setup lang="ts">
const user = useSupabaseUser();
const userStore = useUserStore();
onMounted(async () => {
  if (user.value?.id) await userStore.fetchUserProfile(user.value.id);
});
</script>

<template>
  <div class="quiz-layout">
    <!-- Only the main content, no sidebar -->
    <slot />
  </div>
</template>

<style scoped>
.quiz-layout {
  min-height: 100vh;
  background: #f8f9fa;
}
</style>
