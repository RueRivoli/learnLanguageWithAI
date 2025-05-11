<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const messageText = ref<string | null>(route.params.text);
</script>

<template>
  <div class="w-full border p-5 text-gray-900  border-gray-300 bg-gray-50 rounded-lg">
    {{ messageText }}
  </div>
</template>
