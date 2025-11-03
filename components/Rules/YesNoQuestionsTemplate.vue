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
            As in English, questions in Turkish are marked with a question mark
            (?). However, yes/no questions require
            <span class="underline"
              >the addition of a specific particle — formed by the letter "m"
              followed by an i-type
            </span>
            vowel that matches the last vowel of the preceding word, in
            accordance with vowel harmony.
          </p>
        </div>
      </div>
    </div>
    <!-- End Header -->

    <br />

    <!-- Basic Structure -->
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

        <h2 class="text-lg font-semibold text-gray-900">Basic Structure</h2>
      </div>

      <p class="text-gray-700 mb-3">
        To form yes/no questions in Turkish, a question particle —
        <strong class="text-primary"
          >mi (or one of its vowel-harmonized forms: mı, mu, mü)</strong
        >
        — is added after the main verb, noun or adjective it questions.<br />
        The choice of vowel depends on the last vowel of the preceding word,
        following the rules of vowel harmony. After the question particle,
        personal suffixes are added when needed.
      </p>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            The question particle follows
            <strong class="mr-2 text-primary">vowel harmony rules</strong>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            The syllable before the particle gets
            <strong class="mr-2 text-primary">main stress</strong>
          </span>
        </li>
      </ul>
    </div>
    <br />
    <div>
      <h2 class="text-lg font-semibold text-gray-900 mb-3">
        Vowel Harmony Rules
      </h2>
      <div id="table_present_endings">
        <div
          class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
        >
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr
                  class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200"
                >
                  <th
                    class="px-6 py-4 text-left text-sm font-bold text-gray-700 tracking-wide"
                  >
                    Last Vowel of preceding word
                  </th>
                  <th
                    class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                  >
                    Ending
                  </th>
                  <th
                    class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                  >
                    Example
                  </th>
                  <th
                    class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                  >
                    Translation
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >a, ı</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      -mı
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      mehmet akıllı<strong class="text-primary"> mı?</strong>
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      is Mehmet intelligent?
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >e, i</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      mi
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      sen iyi <strong class="text-primary">misin?</strong>
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      are you ok?
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >o, u</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >mu
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >gezmeyi seviyor<strong class="text-primary">
                        musun?</strong
                      >
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      do you like to travel?
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="font-semibold rounded-lg text-gray-700"
                        >ö, ü</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      mü
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      gerçekten özgür
                      <strong class="text-primary">müyüm?</strong>
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      am I really free?
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
        <!-- Basic Questions -->
        <div class="border-l-4 border-success pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">After a noun</h3>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Şunlar tavuk <strong class="text-success">mu</strong>?</span
                >
                <em> – Are those chickens?</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Bunlar gerçek <strong class="text-success">mi</strong>?</span
                >
                <em> – Are these real?</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Onlar akraba <strong class="text-success">mı</strong>?</span
                >
                <em> – Are they related?</em>
              </span>
            </li>
          </ul>
        </div>
        <br />

        <!-- Personal Questions -->
        <div class="border-l-4 border-success pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">After an adjective</h3>
          <p class="text-gray-700 text-sm mb-2">
            When the subject isn't third person, the question particle takes a
            personal suffix
          </p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >O genç <strong class="text-success">mi</strong>?</span
                >
                <em> – Is he young?</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Paris kalabalık
                  <strong class="text-success">mı</strong>?</span
                >
                <em> – Is Paris crowded ?</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Sen yorgun <strong class="text-success">musun</strong>?</span
                >
                <em> – Are you tired?</em>
              </span>
            </li>
          </ul>
        </div>
        <br />

        <!-- Word Order Examples -->
        <div class="border-l-4 border-success pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">After a verb</h3>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Arkadaşın akşam geliyor
                  <strong class="text-success">mu</strong>?</span
                >
                <em> – Does your friend come this evening?</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Futbol oynar
                  <strong class="text-success">misiniz</strong>?</span
                >
                <em> – Do you play football?</em>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <br />
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
        <h2 class="text-lg font-semibold text-gray-900">Remarks</h2>
      </div>
      <div class="mt-2 space-y-4">
        <!-- Proper Names -->
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">
            Impact on emphasis and pronunciation
          </h3>
          <p>
            In the yes/no questions, the interrogative particle
            <strong class="text-warning"
              >shifts the sentence’s emphasis to the syllable immediately before
              it</strong
            >. <br />
            This changes the stress pattern of the words, because the stress is
            made on the last syllable before 'mi'. <br />
            For example, in “O mutlu” (He is happy), the emphasis is on mut.
            <br />But in “O mutlu mu?” (Is he happy?), the stress shifts to lu.
            <br />Because the stressed syllable often marks the focus of the
            sentence, changing the position of the question particle can shift
            the meaning or emphasis by drawing attention to a different word.
          </p>
        </div>

        <!-- Consonant Mutation -->
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">The 3rd plural case</h3>
          <p class="mb-2">
            In Turkish, when forming yes/no questions with the
            <strong class="text-warning"
              >third person plural pronoun onlar (they)</strong
            >,<br />
            the personal ending is typically added to the adjective rather than
            to the question particle.<br />
            However, in practice, this ending is often omitted altogether.<br />
          </p>
          <ul class="space-y-1 text-sm text-gray-700 mb-2">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class="">
                  <span class="line-through">mutlular mı </span> → mutlu mu?
                  (more common)
                </span>
                -
                <em>Are they happy?</em>
              </span>
            </li>
          </ul>
          <p>
            This is one of several exceptions in Turkish where third person
            plural forms follow different placement rules for personal endings.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>
