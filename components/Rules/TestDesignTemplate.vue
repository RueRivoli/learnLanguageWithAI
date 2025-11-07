<template>
  <div class="max-w-4xl mx-auto p-6 space-y-6">
    <div
      class="p-4 bg-base-100 text-base-content rounded-lg border border-base-300 mt-4"
    >
      <div class="flex items-center gap-2 mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-5 w-5 text-base-content"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
          />
        </svg>
        <span class="text-xl">Information</span>
      </div>
      <p class="text-gray-700 mb-3">
        Overall explanation of the topic. The suffixes
        <code
          class="bg-secondary rounded-md px-2 py-1 mx-1 font-mono text-xs border border-primary/20"
          >-bilir</code
        >
        and
        <code
          class="bg-secondary rounded-md px-2 py-1 mx-1 font-mono text-xs border border-primary/20"
          >-ama</code
        >
        show <span class="text-primary">ability</span> and
        <span class="text-primary">inability</span>, respectively.
      </p>
      <ul class="space-y-2 text-gray-700"></ul>
    </div>

    <div class="mt-4">
      <div class="flex items-center gap-2 mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-5 h-5 text-amber-600"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
        <h2 class="text-lg text-base-content">Exceptions</h2>
      </div>
      <p class="mt-2 mb-3">
        A few verbs do not follow the standard pattern when adding
        <code
          class="bg-secondary rounded-md px-2 py-1 mx-1 font-mono text-xs border border-primary/20"
          >-bilir</code
        >
        or
        <code
          class="bg-secondary rounded-md px-2 py-1 mx-1 font-mono text-xs border border-primary/20"
          >-ama</code
        >.
      </p>
      <div class="space-y-4">
        <div
          class="border-l-4 border-warning/30 pl-4 py-1 rounded-r-lg bg-warning/5"
        >
          <h3
            class="text-base-content text-lg mb-1 px-2.5 py-1 bg-warning/15 rounded-md font-medium"
          >
            Exception 1
          </h3>
          <p class="px-2.5 text-base-content mb-2 leading-relaxed">
            When the stem ends in a vowel, a buffer consonant
            <code
              class="bg-warning/10 rounded-md px-2 py-1 mx-1 font-mono text-xs border border-warning/15"
              >y</code
            >
            may appear.
          </p>
          <ul class="px-2.5 space-y-1 text-sm">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span
                >ye <span class="font-light">(eat)</span> →
                <span class="text-warning font-medium">yiyebilir</span>
                <span class="font-light">(can eat)</span></span
              >
            </li>
          </ul>
        </div>

        <div
          class="border-l-4 border-warning/30 pl-4 py-1 rounded-r-lg bg-warning/5"
        >
          <h3
            class="text-base-content text-lg mb-1 px-2.5 py-1 bg-warning/15 rounded-md font-medium"
          >
            Exception 2
          </h3>
          <p class="px-2.5 text-base-content mb-2 leading-relaxed">
            Some irregular verbs have a vowel drop or change.
          </p>
          <ul class="px-2.5 space-y-1 text-sm">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span
                >demek <span class="font-light">(to say)</span> →
                <span class="text-warning font-medium">diyebilir</span>
                <span class="font-light">(can say)</span></span
              >
            </li>

            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span
                >yemek <span class="font-light">(to eat)</span> →
                <span class="text-warning font-medium">yiyebilir</span>
                <span class="font-light">(can eat)</span></span
              >
            </li>

            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span
                >gitmek <span class="font-light">(to go)</span> →
                <span class="text-warning font-medium">gidebilir</span>
                <span class="font-light">(can go)</span></span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      class="p-4 bg-base-100 text-base-content rounded-lg border border-base-300 mt-4"
    >
      <div class="flex items-center mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-5 w-5 text-primary mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
        <h2 class="text-lg">Many usages</h2>
      </div>
      <p class="mb-3">
        The
        <code
          class="bg-secondary rounded-md px-2 py-1 mx-1 font-mono text-xs border border-primary/20"
          >-bilir</code
        >
        and
        <code
          class="bg-secondary rounded-md px-2 py-1 mx-1 font-mono text-xs border border-primary/20"
          >-ama</code
        >
        suffixes have several practical uses.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="ml-2 mb-3 font-medium text-lg text-primary">Ability</h3>
          <p
            class="bg-secondary px-2 py-1 rounded-md border border-primary/20 mb-2"
          >
            Express capability to perform an action.
          </p>
          <div class="px-2 py-1">
            <span
              >O çok hızlı koş<span class="text-base-content"
                >abilir</span
              ></span
            >
            — <span class="font-light">He can run very fast.</span>
          </div>
        </div>

        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="ml-2 mb-3 font-medium text-lg text-primary">
            Possibility
          </h3>
          <p
            class="bg-secondary px-2 py-1 rounded-md border border-primary/20 mb-2"
          >
            Express likelihood or possibility.
          </p>
          <div class="px-2 py-1">
            <span
              >Yarın yağmur yağ<span class="text-base-content"
                >abilir</span
              ></span
            >
            — <span class="font-light">It might rain tomorrow.</span>
          </div>
        </div>

        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="ml-2 mb-3 font-medium text-lg text-primary">Permission</h3>
          <p
            class="bg-secondary px-2 py-1 rounded-md border border-primary/20 mb-2"
          >
            Used in polite requests or granting permission.
          </p>
          <div class="px-2 py-1">
            <span>Gid<span class="text-base-content">ebilir</span> miyim?</span>
            — <span class="font-light">May I go?</span>
          </div>
        </div>

        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="ml-2 mb-3 font-medium text-lg text-primary">Inability</h3>
          <p
            class="bg-secondary px-2 py-1 rounded-md border border-primary/20 mb-2"
          >
            Show incapacity or impossibility.
          </p>
          <div class="px-2 py-1">
            <span>Bugün gelem<span class="text-base-content">em</span></span>
            — <span class="font-light">I can’t come today.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>
