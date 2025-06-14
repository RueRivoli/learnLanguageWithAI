<script setup lang="ts"></script>

<template>
  <div class="h-full min-h-screen flex flex-col">
    <div class="flex">
      <LayoutSidebar />
      <!-- Main content -->
      <main class="max-h-screen p-4 w-full bg-base-200">
        <!-- <div class="h-10 border-b border-primary/20">
          <LayoutHeader />
        </div> -->
        <NuxtPage />
        <!-- <div class="flex justify-between"></div> -->
      </main>
    </div>
  </div>
</template>
