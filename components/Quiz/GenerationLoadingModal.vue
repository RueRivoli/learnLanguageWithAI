<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    id: string | null;
    type: 'quiz' | 'story'
  }>(),
  {
    id: null,
    type: "quiz",
  }
);

const loadingModal = ref<HTMLDialogElement | null>(null);

const openModal = () => {
  loadingModal.value?.showModal();
};

const closeModal = () => {
  loadingModal.value?.close();
};

defineExpose({
  openModal,
  closeModal,
});
</script>

<template>
  <dialog ref="loadingModal" :id="props.id" class="modal backdrop-blur-sm">
    <div class="modal-box max-w-md bg-base-100 p-0 shadow-2xl">
      <!-- Header -->
      <div class="px-8 pt-8 pb-6 border-b border-base-300">
        <h3 class="text-2xl font-semibold text-base-content tracking-tight" style="font-family: 'Inter', sans-serif;">
          Generating your {{ props.type }}
        </h3>
        <p class="mt-2 text-sm text-base-content/60">
          This will only take a moment
        </p>
      </div>
      
      <!-- Content -->
      <div class="px-8 py-12">
        <div class="flex flex-col items-center justify-center space-y-6">
          <!-- Animated Loading Spinner -->
          <div class="relative">
            <!-- Outer ring with pulse animation -->
            <div class="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
            
            <!-- Middle ring -->
            <div class="relative w-20 h-20 rounded-full bg-gradient-to-tr from-primary/30 to-primary/10 flex items-center justify-center">
              <!-- Inner spinning circle -->
              <div class="w-16 h-16 rounded-full border-4 border-base-300 border-t-primary animate-spin" />
            </div>
          </div>
          
          <!-- Loading text with typing animation -->
          <div class="text-center space-y-2">
            <p class="text-base font-medium text-base-content">
              Creating your personalized {{ props.type }}
            </p>
            <div class="flex items-center justify-center space-x-1">
              <span class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0ms;" />
              <span class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 150ms;" />
              <span class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 300ms;" />
            </div>
          </div>
          
          <!-- Progress hint -->
          <div class="w-full max-w-xs">
            <div class="bg-base-200 rounded-full h-1.5 overflow-hidden">
              <div class="bg-gradient-to-r from-primary to-secondary h-full animate-progress" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
@keyframes progress {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}

.animate-progress {
  animation: progress 1.5s ease-in-out infinite;
  width: 40%;
}
</style>
