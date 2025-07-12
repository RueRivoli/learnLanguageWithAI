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
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Passive and Reflexive Verbs</h1>
          <p class="text-gray-700 leading-relaxed">
            Learn how to form passive and reflexive verbs in Turkish using the -ıl/-il/-ul/-ül and -ın/-in/-un/-ün suffixes.
          </p>
        </div>
      </div>
    </div>

    <!-- Passive Verbs -->
    <div class="bg-gray-50 rounded-lg p-5 border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900 mb-3">Passive Verbs (-ıl/-il/-ul/-ül)</h2>
      <p class="text-gray-700 mb-3">Passive verbs indicate that the subject receives the action rather than performing it.</p>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
          <span>
            <strong>Formation:</strong> Verb stem + <code class="bg-white px-2 py-1 rounded border text-sm">-ıl/-il/-ul/-ül</code> + personal endings
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
          <span>
            <strong>Examples:</strong> yazmak → yazılır (is written), okumak → okunur (is read)
          </span>
        </li>
      </ul>
    </div>

    <!-- Reflexive Verbs -->
    <div class="bg-gray-50 rounded-lg p-5 border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900 mb-3">Reflexive Verbs (-ın/-in/-un/-ün)</h2>
      <p class="text-gray-700 mb-3">Reflexive verbs indicate that the subject performs the action on themselves.</p>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
          <span>
            <strong>Formation:</strong> Verb stem + <code class="bg-white px-2 py-1 rounded border text-sm">-ın/-in/-un/-ün</code> + personal endings
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
          <span>
            <strong>Examples:</strong> yıkamak → yıkanır (washes oneself), giyinmek → giyinir (dresses oneself)
          </span>
        </li>
      </ul>
    </div>

    <!-- Examples -->
    <div>
      <h2 class="text-lg font-semibold text-gray-900 mb-3">Examples</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-gray-900 mb-2">Passive</h3>
          <ul class="space-y-1 text-sm text-gray-700">
            <li><span class="font-medium">Kitap yazılır.</span> - <em>The book is written.</em></li>
            <li><span class="font-medium">Kapı açılır.</span> - <em>The door is opened.</em></li>
          </ul>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-gray-900 mb-2">Reflexive</h3>
          <ul class="space-y-1 text-sm text-gray-700">
            <li><span class="font-medium">Çocuk yıkanır.</span> - <em>The child washes himself.</em></li>
            <li><span class="font-medium">Kadın giyinir.</span> - <em>The woman dresses herself.</em></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>
