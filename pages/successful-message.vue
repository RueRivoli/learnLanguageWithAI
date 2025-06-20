<script setup lang="ts">
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
const route = useRoute();

const messageText = ref<string | null>(route.query.text);
</script>

<template>
  <div class="h-[calc(100vh-4rem)] space-y-12 flex justify-center items-center">
    <div class="w-full flex flex-col justify-center items-center">
      <div>
        <div class="flex flex-col items-center">
          <img
            alt="LinguaLab Logo"
            class="h-30 w-auto"
            src="~/assets/logo/banner/logo1.png"
          />
          <div role="alert" class="alert alert-success alert-soft text-white">
            <CheckCircleIcon
              class="h-5 w-5 group-hover:text-indigo-800"
            />
            <span>{{ messageText }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
