<script setup lang="ts">
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
const route = useRoute();

definePageMeta({
  layout: "auth",
});
const messageText = ref<string | null>(route.query.text);
</script>

<template>
  <div
    class="h-full space-y-12 flex justify-center items-center"
  >
    <div class="w-full flex flex-col justify-center items-center">
      <div>
        <div class="flex flex-col gap-4 items-center">
          <div>
            <img
              alt="LinguaLab Logo"
              class="h-30 w-auto"
              src="~/assets/logo/transparent/language-lab-black.png"
            />
          </div>

          <div role="alert" class="alert alert-success text-white">
            <CheckCircleIcon class="h-5 w-5" />
            <span>{{ messageText }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
