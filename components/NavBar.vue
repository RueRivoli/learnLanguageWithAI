<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();
</script>

<template>
  <div>
    <NavBarAuthUser v-if="user?.id" />
    <NavBarPublic v-else />
  </div>
</template>

<style scoped></style>
