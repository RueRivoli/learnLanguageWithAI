<script setup lang="ts">
import Sidebar from "./sidebar.vue";

// You can add layout-level logic here if needed
</script>

<template>
  <div>
    fezfez
    <Sidebar />
    <!-- Main content -->
    <main class="flex-1 p-6">
      <slot />
    </main>
  </div>
</template>
