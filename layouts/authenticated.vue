<script setup lang="ts">
// You can add layout-level logic here if needed
</script>

<template>
  <div class="h-full flex min-h-screen">
    <Sidebar />
    <!-- Main content -->
    <main class="bg-slate-50 grow dark:bg-indigo-500 justify-between p-6">
      <div class="h-10 border-b border-zinc-200">header</div>
      <!-- <slot /> -->
      <NuxtPage />
      <!-- <div class="flex justify-between"></div> -->
    </main>
  </div>
</template>
