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
  <dialog ref="loadingModal" :id="props.id ?? undefined" class="modal backdrop-blur-sm">
    <div class="modal-box max-w-md bg-base-100 p-0 shadow-2xl">
      <!-- Header -->
      <div class="bg-primary text-white p-4 border-b border-base-300">
        <h3 class="text-2xl font-semibold tracking-tight" style="font-family: 'Inter', sans-serif;">
          Generating your {{ props.type }}
        </h3>
        <p class="mt-2 text-sm">
          This will only take a short moment
        </p>
      </div>
      
      <!-- Content -->
      <div class="px-8 py-12">
        <div class="flex flex-col items-center justify-center space-y-6">
          <!-- Animated Loading Spinner -->
          <div class="relative">
            <div class="flex items-center justify-center space-x-4">
              <img src="~/assets/logo/transparent/language-lab-toucan-black.png" alt="Loading" class="w-15 h-auto bounce-1" />
              <img src="~/assets/logo/transparent/language-lab-toucan-black.png" alt="Loading" class="w-15 h-auto bounce-2" />
              <img src="~/assets/logo/transparent/language-lab-toucan-black.png" alt="Loading" class="w-15 h-auto bounce-3" />
              <img src="~/assets/logo/transparent/language-lab-toucan-black.png" alt="Loading" class="w-15 h-auto bounce-4" />
              <img src="~/assets/logo/transparent/language-lab-toucan-black.png" alt="Loading" class="w-15 h-auto bounce-5" />
            </div>
          </div>
          
          <!-- Loading text with typing animation -->
          <div class="text-center space-y-2">
            <p class="text-base font-medium text-base-content">
              Creating your personalized {{ props.type }}
            </p>
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

@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
}

.bounce-1 {
  animation: pulse 1.5s ease-in-out infinite;
  animation-delay: 0s;
}

.bounce-2 {
  animation: pulse 1.5s ease-in-out infinite;
  animation-delay: 0.15s;
}

.bounce-3 {
  animation: pulse 1.5s ease-in-out infinite;
  animation-delay: 0.3s;
}

.bounce-4 {
  animation: pulse 1.5s ease-in-out infinite;
  animation-delay: 0.45s;
}

.bounce-5 {
  animation: pulse 1.5s ease-in-out infinite;
  animation-delay: 0.6s;
}
</style>
