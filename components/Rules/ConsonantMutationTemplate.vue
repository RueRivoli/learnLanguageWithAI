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
            When adding suffixes in Turkish,
            <span class="underline"
              >some consonants change to improve pronunciation flow.</span
            >
            This is called consonant mutation, and understanding it is key to
            speaking naturally.
          </p>
        </div>
      </div>
    </div>
    <br />
    <!-- Rule 1: Word-Final Consonant Mutation -->
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

        <h2 class="text-lg font-semibold text-gray-900">
          Rule 1: Word-Final Consonant Mutation ("Ketçap Rule")
        </h2>
      </div>
      <p class="text-gray-700 mb-3">
        If a word ends in k / t / ç / p and you add a suffix starting with a
        vowel, the final consonant softens:
      </p>

      <div
        class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-4"
      >
        <h3 class="font-medium text-gray-900 mb-2">Consonant Changes</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center">
            <div class="font-medium text-gray-900">K</div>
            <div class="text-sm text-gray-600">→</div>
            <div class="font-medium text-primary">Ğ</div>
          </div>
          <div class="text-center">
            <div class="font-medium text-gray-900">T</div>
            <div class="text-sm text-gray-600">→</div>
            <div class="font-medium text-primary">D</div>
          </div>
          <div class="text-center">
            <div class="font-medium text-gray-900">Ç</div>
            <div class="text-sm text-gray-600">→</div>
            <div class="font-medium text-primary">C</div>
          </div>
          <div class="text-center">
            <div class="font-medium text-gray-900">P</div>
            <div class="text-sm text-gray-600">→</div>
            <div class="font-medium text-primary">B</div>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2 mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-4 w-4 text-primary"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>

        <h3 class="font-medium text-gray-900">Examples</h3>
      </div>

      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <span class="font-medium">ayak + ı</span> →
            <span class="font-medium"
              >aya<strong class="text-primary">ğ</strong>ı</span
            >
            — <em>his/her foot</em>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <span class="font-medium">kanat + i</span> →
            <span class="font-medium"
              >kana<strong class="text-primary">d</strong>ı</span
            >
            — <em>his/her wing</em>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <span class="font-medium">ağaç + ı</span> →
            <span class="font-medium"
              >ağa<strong class="text-primary">c</strong>ı</span
            >
            — <em>his/her tree</em>
          </span>
        </li>

        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <span class="font-medium">kitap + ım</span> →
            <span class="font-medium"
              >kita<strong class="text-primary">b</strong>ım</span
            >
            — <em>my book</em>
          </span>
        </li>
      </ul>
    </div>
    <br />
    <!-- ReferenceExceptions -->
    <div>
      <div class="flex items-center gap-2">
        <svg
          class="w-5 h-5 text-amber-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          />
        </svg>
        <!-- <ExclamationTriangleIcon class="h-5 w-5 mr-2 text-warning" /> -->
        <h2 class="text-lg font-semibold text-gray-900">
          Special Cases & Exceptions
        </h2>
      </div>
      <p class="mt-2 mb-3 font-semibold">Consonant mutation doesn't apply in these cases:</p>
      <div class="space-y-4">
        <!-- Proper Names -->
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">
            Single-syllable words
          </h3>

          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >top → <span class="line-through">tobu</span> to<strong class="text-amber-600">p</strong>u</span
                >
                -
                <em>his/her ball</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >çobanın koç + u  → <span class="line-through">Çobanın kocu</span> Çobanın ko<strong class="text-amber-600">ç</strong>u</span
                >
                -
                <em>The shepherd's goat</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >süt + ü bardağa dök  → <span class="line-through">Südü bardağa dök</span> Sü<strong class="text-amber-600">t</strong>ü bardağa dök</span
                >
                -
                <em>Pour the milk into the glass</em>
              </span>
            </li>
          </ul>
        </div>
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">Loanwords</h3>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >internet + i her gün kullanıyorum → <span class="line-through">internedi her gün kullanıyorum </span>   interne<strong class="text-amber-600">t</strong
                  >i her gün kullanıyorum </span
                >
                -
                <em>I use the internet everyday</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >bilet + ini unutma → <span class="line-through">Biledini unutma</span>  Bile<strong class="text-amber-600">t</strong
                  >ini unutma</span
                >
                -
                <em>Don't forget your ticket</em>
              </span>
            </li>
          </ul>
        </div>
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900">Words ending in -nk</h3>
          <p class="mb-2 italic">k becomes g, not ğ</p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >göz renk + i → <span class="line-through">göz renği</span>  göz ren<strong class="text-amber-600">g</strong
                  >i</span
                >
                -
                <em>eye color</em>
              </span>
            </li>
          </ul>
        </div>
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">Proper names</h3>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Zeynep → <span class="line-through">Zeyneb'in</span>  Zeyne<strong class="text-amber-600">p</strong
                  >'in çantası</span
                >
                -
                <em>the bag of Zeynep</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Tokat + ın nüfusu → <span class="line-through">Tokadın nüfusu</span>  Toka<strong class="text-amber-600">t</strong
                  >'in nüfusu</span
                >
                -
                <em>the population of Tokat</em>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <br />
    <!-- Rule 2: Suffix Consonant Mutation -->
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

        <h2 class="text-lg font-semibold text-gray-900">
            Rule 2: Suffix Consonant Mutation
        </h2>
      </div>
      <p class="text-gray-700 mb-3">
        Sometimes suffixes mutate too. If a word ends in p / ç / t / k / f / h / s / ş
        and a suffix starting with d or c is added, those sounds harden:
      </p>

      <div
        class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-4"
      >
        <h3 class="font-medium text-gray-900 mb-2">Suffix Changes</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="text-center">
            <div class="font-medium text-gray-900">D</div>
            <div class="text-sm text-gray-600">→</div>
            <div class="font-medium text-primary">T</div>
          </div>
          <div class="text-center">
            <div class="font-medium text-gray-900">C</div>
            <div class="text-sm text-gray-600">→</div>
            <div class="font-medium text-primary">Ç</div>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2 mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-4 w-4 text-primary"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>

        <h3 class="font-medium text-gray-900">Examples</h3>
      </div>
     
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <span class="font-medium">Türk + ce</span> →
            <span class="font-medium"
              >Türk<strong class="text-primary">ç</strong></span
            >e
            — <em>Turkish</em>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <span class="font-medium">git + di</span> →
            <span class="font-medium"
              >git<strong class="text-primary">t</strong></span
            >i
            — <em>he/she went</em>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <span class="font-medium">(Bu bir) kitap + dir</span> →
            <span class="font-medium"
              >kitap<strong class="text-primary">t</strong></span
            >ir
            — <em>This is a book</em>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <span class="font-medium">et + di</span> →
            <span class="font-medium"
              >et<strong class="text-primary">t</strong></span
            >i
            — <em>he/she did</em>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>
