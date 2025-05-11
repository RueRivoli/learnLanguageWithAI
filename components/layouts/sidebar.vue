<script setup>
// Nothing needed here unless you want layout-specific logic
</script>

<template>
    <div class="flex min-h-screen bg-gray-50">
      <!-- Sidebar -->
      <aside class="w-64 bg-white border-r border-gray-200 shadow-sm">
        <div class="p-6 text-2xl font-bold text-gray-800">📘 LearnLanguageWithAI</div>
        <nav class="mt-8">
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/lessons"
                class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all"
                active-class="bg-blue-100 text-blue-700 font-medium"
              >
                My Lessons
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/grammar"
                class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all"
                active-class="bg-blue-100 text-blue-700 font-medium"
              >
                Grammar
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/vocabulary"
                class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all"
                active-class="bg-blue-100 text-blue-700 font-medium"
              >
                My Vocabulary
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/conjugation"
                class="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all"
                active-class="bg-blue-100 text-blue-700 font-medium"
              >
                My Conjugation
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </aside>

    </div>
  </template>
  

  
