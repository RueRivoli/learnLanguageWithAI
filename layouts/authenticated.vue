<script setup lang="ts"></script>

<template>
  <div class="h-full flex min-h-screen">
    <LayoutSidebar />
    <!-- Main content -->
    <main class="p-3 w-full">
      <div class="h-10 border-b border-zinc-200">
        <LayoutHeader />
      </div>
      <!-- <slot /> -->
      <NuxtPage />
      <!-- <div class="flex justify-between"></div> -->
    </main>
    <LayoutFooter />
  </div>
</template>
