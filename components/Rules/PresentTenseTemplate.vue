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
            The present tense (or aorist) is used
            <span class="underline"
              >to speak about general actions and habits.</span
            >
            It's often used with words indicating repetition such as "her zaman"
            (always), "her defa" (each time), and "genellikle" (usually).
          </p>
        </div>
      </div>
    </div>
    <br/>
    <!-- How to Form -->
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
          How to Form the Present Tense
        </h2>
      </div>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span> <strong>Step 1:</strong> Obtain the verb's stem </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <strong>Step 2:</strong> Add the appropriate ending based on the
            last stem's vowel
          </span>
        </li>
      </ul>
    </div>
    <br >
    <div id="stem_creation">
      <div class="bg-gray-50 rounded-lg p-5 border border-gray-200">
        <div class="flex items-center mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5 text-neutral mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
            />
          </svg>

          <h2 class="text-lg font-semibold text-gray-900">
            Step1 - Stem Creation Rules
          </h2>
        </div>
        <div class="p-2">
          <div
            class="bg-white rounded-xl p-4 mb-2 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <h3 class="text-lg font-semibold text-gray-900">
              Verb stems ending in a vowel
            </h3>
            <div class="space-y-2 mt-3">
              <div class="flex items-center gap-2">
                <code
                  class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
                  >add 'r' to form the stem</code
                >
              </div>
            </div>
            <ul class="space-y-1 mt-2 text-sm text-gray-700">
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span>
                <span class=""
                  >demek <em>(to say)</em> -> de<strong class="text-primary"
                    >r</strong
                  >
                </span>
              </li>
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span>
                <span class=""
                  >başlamak <em>(to start)</em> -> başla<strong
                    class="text-primary"
                    >r</strong
                  >
                </span>
              </li>
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span>
                <span class=""
                  >yürümek <em>(to walk)</em> -> yürü<strong
                    class="text-primary"
                    >r</strong
                  >
                </span>
              </li>
            </ul>
          </div>
          <div
            class="bg-white rounded-xl p-4 mb-2 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <h3 class="text-lg font-semibold text-gray-900">
              One-syllable verb stems ending in a consonant
            </h3>
            <div class="space-y-2 mt-3">
              <div class="flex items-center gap-2">
                <code
                  class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
                  >add -ar / -er, following e-type vowel harmony</code
                >
              </div>
            </div>
            <ul class="space-y-1 mt-2 text-sm text-gray-700">
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span>
                <span class=""
                  >yapmak <em>(to do)</em> -> yap<strong class="text-primary"
                    >ar</strong
                  >
                </span>
              </li>
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span>
                <span class=""
                  >çıkmak <em>(to start)</em> -> çık<strong class="text-primary"
                    >ar</strong
                  >
                </span>
              </li>
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span>
                <span class=""
                  >gitmek <em>(to go)</em> -> gid<strong class="text-primary"
                    >er</strong
                  >
                  (with consonant mutation)
                </span>
              </li>
            </ul>
          </div>
          <div
            class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <h3 class="text-lg font-semibold text-gray-900">
              Multi-syllable verb stems ending in a consonant
            </h3>
            <div class="space-y-2 mt-3">
              <div class="flex items-center gap-2">
                <code
                  class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
                  >add -ır / -ir / -ur / -ür, using i-type vowel harmony</code
                >
              </div>
            </div>
            <ul class="space-y-1 mt-2 text-sm text-gray-700">
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span>
                <span class=""
                  >çalışmak <em>(to do)</em> -> çalış<strong
                    class="text-primary"
                    >ır</strong
                  >
                </span>
              </li>
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span>
                <span class=""
                  >gerekmek <em>(to be necessary)</em> -> gerek<strong
                    class="text-primary"
                    >ir</strong
                  >
                </span>
              </li>
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span>
                <span class=""
                  >düşünmek <em>(to think)</em> -> düşün<strong
                    class="text-primary"
                    >ür</strong
                  >
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <br/>
    <div>
      <div>
        <div>
          <div>
            <div class="flex items-center gap-2 mt-2">
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
              <h2 class="text-lg font-semibold text-gray-900">Exceptions</h2>
            </div>
            <div class="space-y-4 mt-2">
              <!-- Proper Names -->
              <div class="border-l-4 border-amber-200 pl-4">
                <h3 class="font-semibold text-gray-900 mb-2">
                  There are 13 frequently used irregular verbs where the aorist
                  uses i-type vowels despite having one-syllable stems. We need
                  to learn them as many of them are used a lot.
                </h3>

                <ul class="space-y-1 text-sm text-gray-700">
                  <li class="flex items-start gap-2">
                    <span
                      class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
                    ></span>
                    <span>
                      <span class=""
                        >olmak <em>(to be)</em> → ol<strong
                          class="text-amber-600"
                          >ur</strong
                        ></span
                      >
                    </span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span
                      class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
                    ></span>
                    <span>
                      <span class=""
                        >almak <em>(to buy)</em> → al<strong
                          class="text-amber-600"
                          >ır</strong
                        ></span
                      >
                    </span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span
                      class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
                    ></span>
                    <span>
                      <span class=""
                        >vermek <em>(to give)</em> → ver<strong
                          class="text-amber-600"
                          >ir</strong
                        ></span
                      >
                    </span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span
                      class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
                    ></span>
                    <span>
                      <span class=""
                        >görmek <em>(to see)</em> → gör<strong
                          class="text-amber-600"
                          >ür</strong
                        ></span
                      >
                    </span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span
                      class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
                    ></span>
                    <span>
                      <span class=""
                        >sanmak <em>(to assume)</em> → san<strong
                          class="text-amber-600"
                          >ır</strong
                        ></span
                      >
                    </span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span
                      class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
                    ></span>
                    <span>
                      <span class=""
                        >vurmak <em>(to hit)</em> → vur<strong
                          class="text-amber-600"
                          >ur</strong
                        ></span
                      >
                    </span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span
                      class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
                    ></span>
                    <span>
                      <span class=""
                        >ölmek <em>(to die)</em> → ol<strong
                          class="text-amber-600"
                          >ür</strong
                        ></span
                      >
                    </span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span
                      class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
                    ></span>
                    <span>
                      <span class=""
                        >bilmek <em>(to know)</em> → bil<strong
                          class="text-amber-600"
                          >ir</strong
                        ></span
                      >
                    </span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span
                      class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
                    ></span>
                    <span>
                      <span class=""
                        >kalmak <em>(to stay)</em> → kal<strong
                          class="text-amber-600"
                          >ır</strong
                        ></span
                      >
                    </span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span
                      class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
                    ></span>
                    <span>
                      <span class=""
                        >bulmak <em>(to find)</em> → bul<strong
                          class="text-amber-600"
                          >ur</strong
                        ></span
                      >
                    </span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span
                      class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
                    ></span>
                    <span>
                      <span class=""
                        >durmak <em>(to stop, stand)</em> → dur<strong
                          class="text-amber-600"
                          >ur</strong
                        ></span
                      >
                    </span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span
                      class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
                    ></span>
                    <span>
                      <span class=""
                        >varmak <em>(to arrive)</em> → var<strong
                          class="text-amber-600"
                          >ır</strong
                        ></span
                      >
                    </span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span
                      class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
                    ></span>
                    <span>
                      <span class=""
                        >gelmek <em>(to come)</em> → gel<strong
                          class="text-amber-600"
                          >ir</strong
                        ></span
                      >
                    </span>
                  </li>
                </ul>
              </div>
              <div class="border-l-4 border-amber-200 pl-4">
                <h3 class="font-semibold text-gray-900 mb-2">
                  Passive Verb Exceptions
                </h3>
                <p class="pb-2">
                  Three passive verbs also break the rule, using i-type harmony
                  with single-syllable stems:
                </p>
                <ul class="space-y-1 text-sm text-gray-700">
                  <li class="flex items-start gap-2">
                    <span
                      class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
                    ></span>
                    <span>
                      <span class=""
                        >denmek <em>(to be called)</em> → den<strong
                          class="text-amber-600"
                          >ir</strong
                        ></span
                      >
                    </span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span
                      class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
                    ></span>
                    <span>
                      <span class=""
                        >yenmek <em>(to be defeated)</em> → yen<strong
                          class="text-amber-600"
                          >ir</strong
                        ></span
                      >
                    </span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span
                      class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
                    ></span>
                    <span>
                      <span class=""
                        >konmak <em>(to be placed/put)</em> → kon<strong
                          class="text-amber-600"
                          >ur</strong
                        ></span
                      >
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br >
    <!-- Vowel Harmony Rules -->

    <div id="ending_addition">
      <div class="bg-gray-50 rounded-lg p-5 border border-gray-200">
        <div class="flex items-center mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5 text-neutral mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z"
            />
          </svg>

          <h2 class="text-lg font-semibold text-gray-900">
            Step2 - Add the appropriate ending with the vowel harmony
          </h2>
        </div>
        <div id="table_present_endings">
          <h3 class="p-3 font-semibold text-gray-900 mb-2">
            Once you get the stem, you add the same endings as the form "to
            be":
          </h3>
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
                      Last Vowel
                    </th>
                    <th
                      class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                    >
                      a/ı
                    </th>
                    <th
                      class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                    >
                      e/i
                    </th>
                    <th
                      class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                    >
                      o/u
                    </th>
                    <th
                      class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                    >
                      ö/ü
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr class="hover:bg-primary/5 transition-colors duration-150">
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                        <span class="text-sm font-semibold text-gray-900"
                          >Ben</span
                        >
                      </div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        -[y]ım
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        -[y]im
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        -[y]um
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        -[y]üm
                      </span>
                    </td>
                  </tr>
                  <tr class="hover:bg-primary/5 transition-colors duration-150">
                    <td class="px-6 py-4 text-center">
                      <div class="flex items-center">
                        <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                        <span class="text-sm font-semibold text-gray-900"
                          >Sen</span
                        >
                      </div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        -sın
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        -sin
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        -sun
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        -sün
                      </span>
                    </td>
                  </tr>
                  <tr class="hover:bg-primary/5 transition-colors duration-150">
                    <td class="px-6 py-4 text-center">
                      <div class="flex items-center">
                        <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                        <span class="text-sm font-semibold text-gray-900"
                          >O</span
                        >
                      </div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                        >∅
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                        >∅
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                        >∅
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                        >∅</span
                      >
                    </td>
                  </tr>
                  <tr class="hover:bg-primary/5 transition-colors duration-150">
                    <td class="px-6 py-4 text-center">
                      <div class="flex items-center">
                        <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                        <span
                          class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >Biz</span
                        >
                      </div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        -[y]ız
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        -[y]iz
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        -[y]uz
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        -[y]üz
                      </span>
                    </td>
                  </tr>
                  <tr class="hover:bg-primary/5 transition-colors duration-150">
                    <td class="px-6 py-4 text-center">
                      <div class="flex items-center">
                        <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                        <span class="text-sm font-semibold text-gray-900"
                          >Siz</span
                        >
                      </div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        -sınız
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        -siniz
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        -sunuz
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        -sünüz
                      </span>
                    </td>
                  </tr>
                  <tr class="hover:bg-primary/5 transition-colors duration-150">
                    <td class="px-6 py-4 text-center">
                      <div class="flex items-center">
                        <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                        <span class="text-sm font-semibold text-gray-900"
                          >Onlar</span
                        >
                      </div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        -lar
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        -ler
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        -lar
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        -ler
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <br/>
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
      <div id="table_present_examples_1">
        <div
          class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
        >
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr
                  class="text-center bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200"
                >
                  <th>Verbs</th>
                  <th
                    class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                  >
                    yemek(ye) - to eat
                  </th>
                  <th
                    class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                  >
                    başlamak(başla) - to begin
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Ben</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      yer-im
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      başlar-ım
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Sen</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      yer-sin
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      başlar-sın
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900">O</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >yer</span
                    >
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >başlar</span
                    >
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="font-semibold rounded-lg text-gray-700"
                        >Biz</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      yer-iz
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      başlar-ız
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Siz</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      yer-siniz
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      başlar-sınız
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Onlar</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      yer-ler
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      başlar-lar
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <br/>
      <div id="table_present_examples_2">
        <div
          class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
        >
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr
                  class="text-center bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200"
                >
                  <th>Verbs</th>
                  <th
                    class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                  >
                    çizmek(çiz) - to draw
                  </th>
                  <th
                    class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                  >
                    yazmak(yaz) - to write
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Ben</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      çizer-im
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      yazar-ım
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Sen</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      çizer-sin
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      yazar-sın
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900">O</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >çizer</span
                    >
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >yazar</span
                    >
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="font-semibold rounded-lg text-gray-700"
                        >Biz</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      çizer-iz
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      yazar-ız
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Siz</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      çizer-siniz
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      yazar-sınız
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Onlar</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      çizer-ler
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      yazar-lar
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <br/>
      <div id="table_present_examples_3">
        <div
          class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
        >
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr
                  class="text-center bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200"
                >
                  <th>Verbs</th>
                  <th
                    class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                  >
                    kullanmak(kullan) - to use
                  </th>
                  <th
                    class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                  >
                    düşünmek(düşün) - to think
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Ben</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      kullanır-ım
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      düşünür-üm
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Sen</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      kullanır-sın
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      düşünür-sün
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900">O</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >kullanır</span
                    >
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >düşünür</span
                    >
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="font-semibold rounded-lg text-gray-700"
                        >Biz</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      kullanır-ız
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      düşünür-üz
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Siz</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      düşünür-ler
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      kullanır-lar
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Onlar</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      çizer-ler
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      yazar-lar
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <br >

    <div class="bg-primary/10 rounded-lg p-5 border border-gray-200">
      <div class="flex items-center">
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
          How to Form the Negative
        </h2>
      </div>
      <p class="p-4 font-semibold text-gray-900 mb-3">
        For the negative present tense, it's quite simple.  <br/>
        You'll need to add the following endings to the verb stem (verb without -mak/-mek):
      </p>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <strong>If verb stem ends with a hard vowel :</strong>
            <div class="mt-2">
              <code
                class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
              >
                -mam/-mazsın/-maz/-mayız/-mazsınız/-mazlar</code
              >
            </div>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <strong>If verb stem ends with a soft vowel :</strong>
            <div class="mt-2">
              <code
                class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
              >
                -mem/-mezsin/-mez/-meyiz/-mezsiniz/-mezler</code
              >
            </div>
          </span>
        </li>
      </ul>
    </div>
    <br />
    <!-- Negative Examples -->
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

      <div id="table_present_examples_2">
        <div
          class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
        >
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr
                  class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200"
                >
                  <th>Verbs</th>
                  <th
                    class="px-6 py-4 text-left text-sm font-bold text-gray-700 tracking-wide"
                  >
                    almak(al) - to buy
                  </th>
                  <th
                    class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                  >
                    bilmek(bil) - to know
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Ben</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      al-mam
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      bil-mem
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Sen</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                    al-mazsın
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      bil-mezsin
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900">O</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >al-maz</span
                    >
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >bil-mez</span
                    >
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="font-semibold rounded-lg text-gray-700"
                        >Biz</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                    al-mayız
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      bil-meyiz
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Siz</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                    al-mazsınız
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      bil-mezsiniz
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Onlar</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                    al-mazlar
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      bil-mezler
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>
