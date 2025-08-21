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
            In Turkish, words are built in a way that
            <span class="underline">the vowels follow a specific pattern.</span>
            Vowels are grouped into two sets and we use the vowel harmony to
            know which suffix to add to a word.
          </p>
        </div>
      </div>
    </div>
    <!-- End Header -->
    <!-- Vowel Groups -->
     <br />
    <div class="bg-gray-50 border-base-200 rounded-xl p-5 border shadow-sm">
      <div class="flex items-center gap-3 mb-6">
        <h2 class="text-xl font-bold text-gray-900">Vowel Groups</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-8 h-8 bg-neutral/70 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">H</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Hard Vowels</h3>
          </div>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="text-2xl m-auto font-bold text-gray-700">
                a, ı, o, u
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="text-sm m-auto text-gray-600 font-medium">
                Strong, back vowels
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-8 h-8 bg-base-100/90 rounded-lg flex items-center justify-center"
            >
              <span class="text-neutral font-bold text-sm">S</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Soft Vowels</h3>
          </div>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="text-2xl m-auto font-bold text-gray-700">
                e, i, ö, ü
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="text-sm m-auto text-gray-600 font-medium">
                Gentle, front vowels
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <!-- Harmony Rules -->
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

        <h2 class="text-lg font-semibold text-gray-900">Harmony Rules</h2>
      </div>

      <p class="text-gray-700 mb-3">
        If the last vowel of a word is a hard vowel, the vowels in the suffixes
        that follow can only be hard vowels. Same for soft vowels.
      </p>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <strong class="mr-2">a, ı, o, u</strong> calls<strong class="ml-2"
              >a, ı, o, u</strong
            >
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <strong class="mr-2">e, i, ö, ü</strong> calls
            <strong class="ml-2">e, i, ö, ü</strong>
          </span>
        </li>
      </ul>
    </div>
    <br />
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

        <h2 class="text-lg font-semibold text-gray-900">Examples</h2>
      </div>

      <div class="space-y-4">
        <!-- Proper Names -->
        <div class="border-l-4 border-success pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">
            Plural Form (-ler/-lar)
          </h3>
          <p class="text-gray-700 text-sm mb-2">
            For the plural form, let's add the suffix -ler/-lar
          </p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >araba <em>(car)</em> -> araba<strong class="text-success"
                    >lar</strong
                  >
                </span>
                <em>(cars)</em> — because the last vowel is a hard vowel
                <em>(a)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >gün <em>(day)</em> -> gün<strong class="text-success"
                    >ler</strong
                  >
                </span>
                <em>(days)</em> — because the last vowel is a soft vowel
                <em>(ü)</em>
              </span>
            </li>
          </ul>
        </div>
        <br />
        <div class="border-l-4 border-success pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">
            Locative case (-da/-de)
          </h3>
          <p class="text-gray-700 text-sm mb-2">
            To specify where something or someone is we use the locative form
          </p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >araba <em>(car)</em>-> araba<strong class="text-success"
                    >da</strong
                  > </span
                ><em> (in the car)</em> — because the last vowel is a hard vowel
                <em>(a)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >gün <em>(day)</em>-> gün<strong class="text-success"
                    >de</strong
                  > </span
                ><em> (in the day)</em> — because the last vowel is a soft vowel
                <em>(ü)</em>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowLongRightIcon,
} from "@heroicons/vue/24/outline";
</script>
