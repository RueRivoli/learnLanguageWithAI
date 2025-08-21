<template>
  <div class="max-w-4xl mx-auto p-6 space-y-6">
    <!-- Header -->
    <div
      class="border border-gray-200 border-primary bg-primary text-white rounded-lg p-4"
    >
      <div class="flex items-start gap-3">
        <div
          class="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5 mr-2 text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
            />
          </svg>
        </div>
        <div>
          <p class="text-white/90 leading-relaxed font-semibold">
            Ever heard someone say "çoluk çocuk" or "falan filan" in Turkish? These catchy word pairs aren't random at all — they're part of a fascinating linguistic phenomenon called
            <span class="underline">rhythmic reduplication.</span>
            Turkish loves pairing up similar-sounding words to add flavor, energy, and emotion to everyday speech.
          </p>
        </div>
      </div>
    </div>
    <br />

    <!-- What Are Word Duos -->
    <div class="bg-primary/10 rounded-lg p-5 border border-gray-200">
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
        <h2 class="text-lg font-semibold text-gray-900">What Are Word Duos?</h2>
      </div>
      <p class="text-gray-700 mb-3">
        These nearly-repeating pairs aren't just cute; they transform meaning. Sometimes they intensify an idea, sometimes they soften or tweak the nuance, and sometimes they freeze history — many of these words are no longer used anywhere else in modern Turkish!
      </p>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>They can <strong>intensify an idea</strong></span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>They can <strong>soften or tweak the nuance</strong></span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>They can <strong>freeze history</strong> — many words are no longer used elsewhere</span>
        </li>
      </ul>
    </div>
    <br />

    <!-- The Four Main Types -->
    <div class="bg-gray-50 border-base-200 rounded-xl p-5 border shadow-sm">
      <div class="flex items-center gap-3 mb-6">
        <h2 class="text-xl font-bold text-gray-900">The Four Main Types of Word Duos</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Noun Duos -->
        <div
          class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-8 h-8 bg-neutral/70 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">1</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Noun Duos</h3>
          </div>
          <div class="space-y-2">
            <div class="text-sm text-gray-600 font-medium mb-2">
              "Everything, Everyone, Everywhere"
            </div>
            <p class="text-sm text-gray-700">
              These pairs group things together — usually meaning "all," "every," or "the whole lot."
            </p>
            <ul class="space-y-1 mt-2 text-sm text-gray-700">
              <li class="flex items-start gap-2">
                <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>çoluk çocuk</strong> → the whole family, kids included</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>eş dost</strong> → all your friends and close ones</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>iş güç</strong> → every task, every job</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Adjective Duos -->
        <div
          class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-8 h-8 bg-base-100/90 rounded-lg flex items-center justify-center"
            >
              <span class="text-neutral font-bold text-sm">2</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Adjective Duos</h3>
          </div>
          <div class="space-y-2">
            <div class="text-sm text-gray-600 font-medium mb-2">
              "Turning Up the Intensity "
            </div>
            <p class="text-sm text-gray-700">
              When two descriptive words team up, the effect amplifies the vibe.
            </p>
            <ul class="space-y-1 mt-2 text-sm text-gray-700">
              <li class="flex items-start gap-2">
                <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>ufak tefek</strong> → tiny, insignificant</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>mutlu mesut</strong> → blissfully happy</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>saçma sapan</strong> → totally absurd</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Verb Duos -->
        <div
          class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-8 h-8 bg-primary/70 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">3</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Verb Duos</h3>
          </div>
          <div class="space-y-2">
            <div class="text-sm text-gray-600 font-medium mb-2">
              "Energy, Action, and Drama"
            </div>
            <p class="text-sm text-gray-700">
              When Turkish doubles up on verbs, it adds movement, duration, or intensity.
            </p>
            <ul class="space-y-1 mt-2 text-sm text-gray-700">
              <li class="flex items-start gap-2">
                <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>düşündüm taşındım</strong> → thought long and hard</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>bağırdı çağırdı</strong> → shouted loudly and repeatedly</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>hoplaya zıplaya</strong> → skipping and hopping joyfully</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Sound-Imitating Duos -->
        <div
          class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-8 h-8 bg-success/70 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">4</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Sound-Imitating Duos</h3>
          </div>
          <div class="space-y-2">
            <div class="text-sm text-gray-600 font-medium mb-2">
              "The Language of Noise"
            </div>
            <p class="text-sm text-gray-700">
              Some pairs are pure sound effects — mimicking splashes, crashes, rustles, and thuds.
            </p>
            <ul class="space-y-1 mt-2 text-sm text-gray-700">
              <li class="flex items-start gap-2">
                <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>paldır küldür</strong> → crash! chaos everywhere</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>şakır şukur</strong> → splash, bang, clatter</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"></span>
                <span><strong>abur cubur</strong> → junk food, snacks</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <br />
    <!-- Real-Life Examples -->
    <div>
      <div class="flex items-center gap-2 mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-5 w-5 text-success"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>
        <h2 class="text-lg font-semibold text-gray-900">Real-Life Examples</h2>
      </div>

      <div class="space-y-4">
        <div class="border-l-4 border-success pl-4">
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >"Çoluk çocuk geldiler." → They came with the whole family, kids and all.</span
                >
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >"Bağırdı çağırdı ama kimse dinlemedi." → He yelled and screamed, but no one listened.</span
                >
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >"Evin içi allak bullak!" → The house is a complete mess!</span
                >
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>