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
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Postpositions</h1>
          <p class="text-gray-700 leading-relaxed">
            Postpositions in Turkish come after the noun and indicate relationships between words, similar to prepositions in English.
          </p>
        </div>
      </div>
    </div>

    <!-- Common Postpositions -->
    <div class="bg-gray-50 rounded-lg p-5 border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900 mb-3">Common Postpositions</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-gray-900 mb-2">Location</h3>
          <ul class="space-y-1 text-sm text-gray-700">
            <li><span class="font-medium">içinde</span> - <em>inside</em></li>
            <li><span class="font-medium">dışında</span> - <em>outside</em></li>
            <li><span class="font-medium">yanında</span> - <em>next to</em></li>
            <li><span class="font-medium">önünde</span> - <em>in front of</em></li>
            <li><span class="font-medium">arkasında</span> - <em>behind</em></li>
          </ul>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-gray-900 mb-2">Time</h3>
          <ul class="space-y-1 text-sm text-gray-700">
            <li><span class="font-medium">sonra</span> - <em>after</em></li>
            <li><span class="font-medium">önce</span> - <em>before</em></li>
            <li><span class="font-medium">sırasında</span> - <em>during</em></li>
            <li><span class="font-medium">kadar</span> - <em>until</em></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Examples -->
    <div>
      <h2 class="text-lg font-semibold text-gray-900 mb-3">Examples</h2>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
          <span>
            <span class="font-medium">Evin içinde</span> - <em>inside the house</em>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
          <span>
            <span class="font-medium">Okuldan sonra</span> - <em>after school</em>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
          <span>
            <span class="font-medium">Masaya kadar</span> - <em>until the table</em>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>
