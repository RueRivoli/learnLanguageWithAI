<script setup lang="ts">
const user = useSupabaseUser();
watchEffect(async () => {
  if (user.value?.id) {
    return navigateTo("/learning/dashboard");
  }
});
</script>

<template>
  <div>
    <LayoutNavBar />
    <NuxtPage />
    <LayoutFooter />
  </div>
</template>
