<template>
  <div class="max-w-4xl mx-auto p-6 space-y-6">
    <!-- Header -->
    <div class="border-b border-gray-200 pb-4">
      <div class="flex items-start gap-3">
        <div class="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
          <svg
            class="w-5 h-5 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Numbers and Directions</h1>
          <p class="text-gray-700 leading-relaxed">
            Learn the cardinal numbers and directional words in Turkish.
          </p>
        </div>
      </div>
    </div>

    <!-- Numbers -->
    <div class="bg-gray-50 rounded-lg p-5 border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900 mb-3">Cardinal Numbers</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div class="bg-white p-3 rounded border">
          <div class="font-medium text-gray-900">0-10</div>
          <div class="text-sm text-gray-600">sıfır, bir, iki, üç, dört, beş, altı, yedi, sekiz, dokuz, on</div>
        </div>
        <div class="bg-white p-3 rounded border">
          <div class="font-medium text-gray-900">11-20</div>
          <div class="text-sm text-gray-600">on bir, on iki, on üç, on dört, on beş, on altı, on yedi, on sekiz, on dokuz, yirmi</div>
        </div>
        <div class="bg-white p-3 rounded border">
          <div class="font-medium text-gray-900">Tens</div>
          <div class="text-sm text-gray-600">yirmi, otuz, kırk, elli, altmış, yetmiş, seksen, doksan, yüz</div>
        </div>
      </div>
    </div>

    <!-- Directions -->
    <div>
      <h2 class="text-lg font-semibold text-gray-900 mb-3">Directions</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div class="font-medium text-gray-900 mb-1">North</div>
          <div class="text-gray-600">kuzey</div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div class="font-medium text-gray-900 mb-1">South</div>
          <div class="text-gray-600">güney</div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div class="font-medium text-gray-900 mb-1">East</div>
          <div class="text-gray-600">doğu</div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div class="font-medium text-gray-900 mb-1">West</div>
          <div class="text-gray-600">batı</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>
