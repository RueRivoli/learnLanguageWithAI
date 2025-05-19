<script setup lang="ts"></script>

<template>
  <div class="h-full flex min-h-screen">
    <Sidebar />
    <!-- Main content -->
    <main class="grow justify-between p-6">
      <div class="h-10 border-b border-zinc-200">header</div>
      <!-- <slot /> -->
      <NuxtPage />
      <!-- <div class="flex justify-between"></div> -->
    </main>
  </div>
</template>
