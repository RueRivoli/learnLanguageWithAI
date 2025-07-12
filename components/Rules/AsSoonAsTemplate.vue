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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">As Soon As - -er/-ar/-ır/-ir/-ur/-ür/-or/-ör + -mez/-maz</h1>
          <p class="text-gray-700 leading-relaxed">
            This construction is used to express "as soon as" in Turkish, indicating that one action happens immediately after another.
          </p>
        </div>
      </div>
    </div>

    <!-- How to Form -->
    <div class="bg-gray-50 rounded-lg p-5 border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900 mb-3">How to Form "As Soon As"</h2>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
          <span>
            <strong>Step 1:</strong> Take the verb stem (remove <code class="bg-white px-2 py-1 rounded border text-sm">-mak/-mek</code>)
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
          <span>
            <strong>Step 2:</strong> Add <code class="bg-white px-2 py-1 rounded border text-sm">-er/-ar/-ır/-ir/-ur/-ür/-or/-ör</code> based on vowel harmony
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
          <span>
            <strong>Step 3:</strong> Add <code class="bg-white px-2 py-1 rounded border text-sm">-mez/-maz</code> based on vowel harmony
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
            <span class="font-medium">Eve gelir gelmez telefon açtım.</span> - <em>As soon as I came home, I called.</em>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
          <span>
            <span class="font-medium">İşi bitirir bitirmez gideceğim.</span> - <em>As soon as I finish the work, I will go.</em>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>