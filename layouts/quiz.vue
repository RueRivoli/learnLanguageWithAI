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
