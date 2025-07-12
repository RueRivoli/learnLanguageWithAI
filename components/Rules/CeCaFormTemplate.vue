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
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Ce/Ca Form - -ce/-ca</h1>
          <p class="text-gray-700 leading-relaxed">
            The -ce/-ca suffix is used to form adverbs and to express manner or way of doing something.
          </p>
        </div>
      </div>
    </div>

    <!-- How to Form -->
    <div class="bg-gray-50 rounded-lg p-5 border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900 mb-3">How to Form -ce/-ca</h2>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
          <span>
            <strong>Step 1:</strong> Take the noun or adjective
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
          <span>
            <strong>Step 2:</strong> Add <code class="bg-white px-2 py-1 rounded border text-sm">-ce/-ca</code> based on vowel harmony
          </span>
        </li>
      </ul>
    </div>

    <!-- Examples -->
    <div>
      <h2 class="text-lg font-semibold text-gray-900 mb-3">Examples</h2>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
          <span>
            <span class="font-medium">Türkçe</span> - <em>Turkish (language)</em>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
          <span>
            <span class="font-medium">İngilizce</span> - <em>English (language)</em>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>