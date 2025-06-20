<script setup lang="ts">
const user = useSupabaseUser();
watchEffect(async () => {
  if (user.value?.id) {
    console.log("ici", user.value);
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
