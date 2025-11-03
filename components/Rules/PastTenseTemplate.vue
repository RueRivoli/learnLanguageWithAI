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
            As in English, the Turkish past simple tense is used to
            <span class="underline"
              >describe actions that occurred and were completed in the
              past</span
            >
          </p>
        </div>
      </div>
    </div>
    <!-- End Header -->

    <br />

    <!-- Important Primary section -->
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
          How To Form Past Tense?
        </h2>
      </div>

      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <strong>Step 1:</strong> Take the verb stem (remove
            <code class="bg-white px-2 py-1 rounded border text-sm"
              >-mak/-mek</code
            >)
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <strong>Step 2:</strong> Add
            <code class="bg-white px-2 py-1 rounded border text-sm"
              >-di/-dı/-du/-dü</code
            >
            based on i-type vowel harmony + personal endings
          </span>
        </li>
      </ul>
    </div>
    <!-- End Important Primary Section -->

    <br />

    <!-- Example section -->
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
          <h3 class="font-semibold text-gray-900 mb-2">Regular examples</h3>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >koymak <em>(to put)</em> -> ben masaya kitabı koy<strong
                    class="text-success"
                    >dum</strong
                  >
                </span>
                <em>(I put the book on the table)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >uyanmak <em>(to wake up)</em> -> sen sabah erken uyan<strong
                    class="text-success"
                    >dın</strong
                  >
                </span>
                <em>(you woke up early in the morning)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >yemek <em>(to eat)</em> -> o köfte yed<strong
                    class="text-success"
                    >i</strong
                  >
                </span>
                <em> (he ate köfte)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >gülmek <em>(to laugh)</em> -> sınıftaki bütün çocuklar
                  gül<strong class="text-success">dü</strong>
                </span>
                <em> (all the children of the class laughed)</em>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- End Exemples section -->
    <br />
    <!-- Info gray section -->
    <div class="bg-gray-50 rounded-lg p-5 border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900 mb-3">
        How To Apply to Verbs Ending In Voiceless Consonants ?
      </h2>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <div>
            <div class="font-medium">
              Verbs ending in
              <code
                class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
                >ç / k / p / t / s / ş
              </code>
              <br />
              <div>
                have for past tense suffixes
                <code
                  class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
                >
                  -ti/-tı/-tu/-tü</code
                >
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- End Info gray section -->

    <br />

    <!-- Example section -->
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
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >konu<strong class="text-success">ş</strong>mak
                  <em>(to talk)</em> -> bütün gün konuş<strong
                    class="text-success"
                    >tuk</strong
                  >
                </span>
                <em> (we spoke during all the day)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >i<strong class="text-success">ç</strong>mek
                  <em>(to drink)</em> -> o sabah kahve iç<strong
                    class="text-success"
                    >ti</strong
                  >
                </span>
                <em> (he/she drank coffee in the morning)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >çı<strong class="text-success">k</strong>mak
                  <em>(to leave)</em> -> odadan çık<strong class="text-success"
                    >tı</strong
                  >
                </span>
                <em> (he/she left the room)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >ke<strong class="text-success">s</strong>mek
                  <em>(to cut)</em> -> bir saat önce limonları kes<strong
                    class="text-success"
                    >tik</strong
                  >
                </span>
                <em> (we cut the limons one hour ago)</em>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- End Exemples section -->
    <br />

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
          How To Form the Negative Form of Past Tense?
        </h2>
      </div>
      <p class="p-1 font-semibold text-gray-900 mb-3">
        If you want to say that something did not happen in the past:
      </p>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <strong>Step 1:</strong> Take the verb stem (remove
            <code class="bg-white px-2 py-1 rounded border text-sm"
              >-mak/-mek</code
            >)
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <strong>Step 2:</strong> Add
            <code class="bg-white px-2 py-1 rounded border text-sm"
              >-ma / -me</code
            >
            based on
            <strong class="text-primary"> e-type vowel harmony </strong>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <strong>Step 3:</strong> Add
            <code class="bg-white px-2 py-1 rounded border text-sm"
              >-dı / -di / -du / -dü</code
            >
            based on
            <strong class="text-primary"> i-type vowel harmony </strong>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <strong>Step 4:</strong> Add
            <code class="bg-white px-2 py-1 rounded border text-sm"
              >the personal suffix</code
            >
            based on vowel harmony
          </span>
        </li>
      </ul>
    </div>

    <br />

    <!-- Example section -->
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
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >beğenmek <strong class="text-success"></strong>
                  <em>(to like)</em> -> akşam yemeği beğen<strong
                    class="text-success"
                    >medi</strong
                  >
                </span>
                <em> (he didn't like the dinner)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >anlamak <em>(to understand)</em> -> ne dediğini anla<strong
                    class="text-success"
                    >madım</strong
                  >
                </span>
                <em> (I didn't undestand what you said)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >gelmek <em>(to come)</em> -> doğum günüme gel<strong
                    class="text-success"
                    >mediler</strong
                  >
                </span>
                <em> (they didn't come to my birthday)</em>
              </span>
            </li>
          </ul>
        </div>
        <br />
      </div>
    </div>
    <!-- End Exemples section -->
    <br />

    <!-- Important Primary section with code samples -->
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
          How To Form Yes/No Questions in the Past?
        </h2>
      </div>
      <p class="p-2 text-gray-900 italic mb-3">
        Note that the personal suffix is added to the verb not to the
        interrogative particule (unlike Present Continuous Tense)
      </p>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <strong>Step 1:</strong> Take the verb stem (remove
            <code class="bg-white px-2 py-1 rounded border text-sm"
              >-mak/-mek</code
            >)
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <strong>Step 2:</strong> Add
            <code class="bg-white px-2 py-1 rounded border text-sm"
              >-dı / -di / -du / -dü</code
            >
            based on
            <strong class="text-primary"> i-type vowel harmony </strong>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <strong>Step 3:</strong> Add
            <code class="bg-white px-2 py-1 rounded border text-sm"
              >the personal suffix</code
            >
            based on vowel harmony
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <strong>Step 4:</strong> Finish the question with
            <code class="bg-white px-2 py-1 rounded border text-sm"
              >mı / mi / mu / mü</code
            >
            based on vowel harmony
          </span>
        </li>
      </ul>
    </div>
    <!-- End Primary important section with code samples -->
    <br />

    <!-- Example section -->
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
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >gelmek <em>(to come)</em> -> sen gel<strong
                    class="text-success"
                    >din mi?</strong
                  >
                </span>
                <em>(did you come?)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >göndermek <em>(to send)</em> -> mektubu gönder<strong
                    class="text-success"
                    >din mi?</strong
                  >
                </span>
                <em>(did you send the letter?)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >geçirmek <em>(to spend)</em> -> güzel vakit geçir<strong
                    class="text-success"
                    >din mi?</strong
                  >
                </span>
                <em>(did you spend a nice time?)</em>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- End Exemples section -->
  </div>
</template>
