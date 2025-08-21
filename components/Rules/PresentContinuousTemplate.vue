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
            The present continuous tense is used to describe actions that
            <span class="underline">are happening right now</span> or are in
            progress at the moment of speaking.
          </p>
        </div>
      </div>
    </div>
    <br/>
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
          How to Form the Present Continuous
        </h2>
      </div>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <strong>Step 1:</strong> Take the verb stem (remove
            <code
              class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
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
            <code
              class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
              >-ıyor/-iyor/-uyor/-üyor</code
            >
            based on vowel harmony
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span> <strong>Step 3:</strong> Add personal endings </span>
        </li>
      </ul>
    </div>
    <br />

    <!-- ReferenceTable -->
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
                    Last Vowel of verb stem
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
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >a, ı</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      -ıyor
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      çalışmak → çalış<strong class="text-primary">ıyor</strong>
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >e, i</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      -iyor
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      gelmek → gel<strong class="text-primary">iyor</strong>
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >o, u</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >-uyor
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >okumak → ok<strong class="text-primary">uyor</strong>
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="font-semibold rounded-lg text-gray-700"
                        >ö, ü</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      -üyor
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      görmek → gör<strong class="text-primary">üyor</strong>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <br>
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
                  />
                  <th
                    class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                  >
                    çalışmak (to work)
                  </th>
                  <th
                    class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                  >
                    gelmek (to come)
                  </th>
                  <th
                    class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                  >
                    görmek (to see)
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
                      çalış-<strong class="text-primary">ıyorum</strong>
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      gel-<strong class="text-primary">iyorum</strong>
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      gör-<strong class="text-primary">üyorum</strong>
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
                      çalış-<strong class="text-primary">ıyorsun</strong>
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      gel-<strong class="text-primary">iyorsun</strong>
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      gör-<strong class="text-primary">üyorsun</strong>
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
                    >
                      çalış-<strong class="text-primary">ıyor</strong>
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      gel-<strong class="text-primary">iyor</strong>
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      gör-<strong class="text-primary">üyor</strong>
                    </span>
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
                      çalış-<strong class="text-primary">ıyoruz</strong>
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      gel-<strong class="text-primary">iyoruz</strong>
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      gör-<strong class="text-primary">üyoruz</strong>
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="font-semibold rounded-lg text-gray-700"
                        >Siz</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      çalış-<strong class="text-primary">ıyorsunuz</strong>
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      gel-<strong class="text-primary">iyorsunuz</strong>
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      gör-<strong class="text-primary">üyorsunuz</strong>
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="font-semibold rounded-lg text-gray-700"
                        >Onlar</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      çalış-<strong class="text-primary">ıyorlar</strong>
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      gel-<strong class="text-primary">iyorlar</strong>
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      gör-<strong class="text-primary">üyorlar</strong>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
<br>
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
                  >Şu anda çalış<strong class="text-success">ıyorum</strong>
                </span>
                —
                <em> I am working now</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Eve gel<strong class="text-success">iyorsun</strong>
                </span>
                —
                <em> You are coming home</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Kitap ok<strong class="text-success">uyoruz</strong>
                </span>
                —
                <em> We are reading a book</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Onlar köpeği gör<strong class="text-success">üyorlar</strong>
                </span>
                —
                <em> They see the dog</em>
              </span>
            </li>
          </ul>
        </div>
      </div>
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
            How to Use the Negative Form
          </h2>
        </div>
        <ul class="space-y-2 text-gray-700">
          <li class="flex items-start gap-2">
            <span
              class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              <strong>Step 1:</strong> Take the verb stem (remove
              <code
                class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
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
              <code
                class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
                >mı / mi / mu / mü</code
              >
              based on the last vowel
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span
              class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              <strong>Step 3:</strong> Add
              <code
                class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
                >yor</code
              >
              the present continuous tense suffix
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span
              class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
            ></span>
            <span> <strong>Step 4:</strong> Add personal endings </span>
          </li>
        </ul>
      </div>
      <br />
      <!-- Vowel Harmony Rules -->
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
                      Last Vowel of verb stem
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
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  <tr class="hover:bg-primary/5 transition-colors duration-150">
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                        <span class="text-sm font-semibold text-gray-900"
                          >a, ı</span
                        >
                      </div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        -mıyor
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        çalışmak → çalış<strong class="text-primary"
                          >mıyor</strong
                        >
                      </span>
                    </td>
                  </tr>
                  <tr class="hover:bg-primary/5 transition-colors duration-150">
                    <td class="px-6 py-4 text-center">
                      <div class="flex items-center">
                        <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                        <span class="text-sm font-semibold text-gray-900"
                          >e, i</span
                        >
                      </div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        -miyor
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        gelmek → gel<strong class="text-primary">miyor</strong>
                      </span>
                    </td>
                  </tr>
                  <tr class="hover:bg-primary/5 transition-colors duration-150">
                    <td class="px-6 py-4 text-center">
                      <div class="flex items-center">
                        <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                        <span class="text-sm font-semibold text-gray-900"
                          >o, u</span
                        >
                      </div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                        >-muyor
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                        >okumak → ok<strong class="text-primary">muyor</strong>
                      </span>
                    </td>
                  </tr>
                  <tr class="hover:bg-primary/5 transition-colors duration-150">
                    <td class="px-6 py-4 text-center">
                      <div class="flex items-center">
                        <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                        <span class="font-semibold rounded-lg text-gray-700"
                          >ö, ü</span
                        >
                      </div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        -müyor
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        görmek → gör<strong class="text-primary">müyor</strong>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
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
                        />
                        <th
                          class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                        >
                          çalışmak (to work)
                        </th>
                        <th
                          class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                        >
                          gelmek (to come)
                        </th>
                        <th
                          class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                        >
                          görmek (to see)
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
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
                            çalış-<strong class="text-primary"
                              >mı-yor-um</strong
                            >
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            gel-<strong class="text-primary">mi-yor-um</strong>
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            gör-<strong class="text-primary">mü-yor-um</strong>
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
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
                            çalış-<strong class="text-primary"
                              >mı-yor-sun</strong
                            >
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            gel-<strong class="text-primary">mi-yor-sun</strong>
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            gör-<strong class="text-primary">mü-yor-sun</strong>
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
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
                          >
                            çalış-<strong class="text-primary">mı-yor</strong>
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            gel-<strong class="text-primary">mi-yor</strong>
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            gör-<strong class="text-primary">mü-yor</strong>
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
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
                            çalış-<strong class="text-primary"
                              >mı-yor-uz</strong
                            >
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            gel-<strong class="text-primary">mi-yor-uz</strong>
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            gör-<strong class="text-primary">mü-yor-uz</strong>
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
                        <td class="px-6 py-4 text-center">
                          <div class="flex items-center">
                            <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                            <span class="font-semibold rounded-lg text-gray-700"
                              >Siz</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            çalış-<strong class="text-primary"
                              >mı-yor-sunuz</strong
                            >
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            gel-<strong class="text-primary"
                              >mi-yor-sunuz</strong
                            >
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            gör-<strong class="text-primary"
                              >mü-yor-sunuz</strong
                            >
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
                        <td class="px-6 py-4 text-center">
                          <div class="flex items-center">
                            <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                            <span class="font-semibold rounded-lg text-gray-700"
                              >Onlar</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            çalış-<strong class="text-primary"
                              >mı-yor-lar</strong
                            >
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            gel-<strong class="text-primary">mi-yor-lar</strong>
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            gör-<strong class="text-primary">mü-yor-lar</strong>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <br />
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
                          >Ali çalış<strong class="text-success">mıyor</strong>
                        </span>
                        —
                        <em> Ali is not working</em>
                      </span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span
                        class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                      ></span>
                      <span>
                        <span class=""
                          >Çocuklar okula gel<strong class="text-success"
                            >miyor</strong
                          >
                        </span>
                        —
                        <em> The children at not coming to school</em>
                      </span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span
                        class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                      ></span>
                      <span>
                        <span class=""
                          >Ahmet dergi oku<strong class="text-success"
                            >muyor</strong
                          >
                        </span>
                        —
                        <em> Ahmet is not reading a magazine</em>
                      </span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span
                        class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                      ></span>
                      <span>
                        <span class=""
                          >Zeynep hiçbir şey gör<strong class="text-success"
                            >müyor</strong
                          >
                        </span>
                        —
                        <em> Zeynep is not seeing anything</em>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

                <!-- extended description -->
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
                    How to Form Positive Questions
                  </h2>
                </div>
                <ul class="space-y-2 text-gray-700">
                  <li class="flex items-start gap-2">
                    <span
                      class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
                    ></span>
                    <span> <strong>Step 1:</strong> Take the verb stem </span>
                  </li>

                  <li class="flex items-start gap-2">
                    <span
                      class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
                    ></span>

                    <span>
                      <strong>Step 2:</strong> Add
                      <code
                        class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
                        >-ıyor/-iyor/-uyor/-üyor</code
                      >
                      the present continuous tense suffix to the verb stem,
                      based on vowel harmony
                    </span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span
                      class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
                    ></span>
                    <span>
                      <strong>Step 3:</strong> Finish the sentence with the
                      interrogative particule
                      <code
                        class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
                        >mu</code
                      >
                     (regardless of the verb's last vowel) + the personal ending
                    </span>
                  </li>
                </ul>
              </div>
              <br />
              <!-- Vowel Harmony Rules -->
              <!-- Vowel Harmony Rules -->
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
                              Last Vowel of verb stem
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
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                          <tr
                            class="hover:bg-primary/5 transition-colors duration-150"
                          >
                            <td class="px-6 py-4">
                              <div class="flex items-center">
                                <div
                                  class="w-2 h-2 bg-primary rounded-full mr-3"
                                ></div>
                                <span
                                  class="text-sm font-semibold text-gray-900"
                                  >a, ı</span
                                >
                              </div>
                            </td>
                            <td class="px-6 py-4 text-center">
                              <span
                                class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                              >
                                -ıyor
                              </span>
                            </td>
                            <td class="px-6 py-4 text-center">
                              <span
                                class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                              >
                                çalışmak → çalış<strong class="text-primary"
                                  >ıyor mu ?</strong
                                >
                              </span>
                            </td>
                          </tr>
                          <tr
                            class="hover:bg-primary/5 transition-colors duration-150"
                          >
                            <td class="px-6 py-4 text-center">
                              <div class="flex items-center">
                                <div
                                  class="w-2 h-2 bg-primary rounded-full mr-3"
                                ></div>
                                <span
                                  class="text-sm font-semibold text-gray-900"
                                  >e, i</span
                                >
                              </div>
                            </td>
                            <td class="px-6 py-4 text-center">
                              <span
                                class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                              >
                                -iyor
                              </span>
                            </td>
                            <td class="px-6 py-4 text-center">
                              <span
                                class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                              >
                                gelmek → gel<strong class="text-primary"
                                  >iyor mu ?</strong
                                >
                              </span>
                            </td>
                          </tr>
                          <tr
                            class="hover:bg-primary/5 transition-colors duration-150"
                          >
                            <td class="px-6 py-4 text-center">
                              <div class="flex items-center">
                                <div
                                  class="w-2 h-2 bg-primary rounded-full mr-3"
                                ></div>
                                <span
                                  class="text-sm font-semibold text-gray-900"
                                  >o, u</span
                                >
                              </div>
                            </td>
                            <td class="px-6 py-4 text-center">
                              <span
                                class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                                >-uyor
                              </span>
                            </td>
                            <td class="px-6 py-4 text-center">
                              <span
                                class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                                >okumak → ok<strong class="text-primary"
                                  >uyor mu ?</strong
                                >
                              </span>
                            </td>
                          </tr>
                          <tr
                            class="hover:bg-primary/5 transition-colors duration-150"
                          >
                            <td class="px-6 py-4 text-center">
                              <div class="flex items-center">
                                <div
                                  class="w-2 h-2 bg-primary rounded-full mr-3"
                                ></div>
                                <span
                                  class="font-semibold rounded-lg text-gray-700"
                                  >ö, ü</span
                                >
                              </div>
                            </td>
                            <td class="px-6 py-4 text-center">
                              <span
                                class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                              >
                                -üyor
                              </span>
                            </td>
                            <td class="px-6 py-4 text-center">
                              <span
                                class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                              >
                                görmek → gör<strong class="text-primary"
                                  >üyor mu ?</strong
                                >
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <br />
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

                    <h2 class="text-lg font-semibold text-gray-900">
                      Examples
                    </h2>
                  </div>
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
                              />
                              <th
                                class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                              >
                                çalışmak (to work)
                              </th>
                              <th
                                class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                              >
                                gelmek (to come)
                              </th>
                              <th
                                class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                              >
                                görmek (to see)
                              </th>
                            </tr>
                          </thead>
                          <tbody class="divide-y divide-gray-100">
                            <tr
                              class="hover:bg-primary/5 transition-colors duration-150"
                            >
                              <td class="px-6 py-4">
                                <div class="flex items-center">
                                  <div
                                    class="w-2 h-2 bg-primary rounded-full mr-3"
                                  ></div>
                                  <span
                                    class="text-sm font-semibold text-gray-900"
                                    >Ben</span
                                  >
                                </div>
                              </td>
                              <td class="px-6 py-4 text-center">
                                <span
                                  class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                                >
                                  çalış-<strong class="text-primary"
                                    >ıyor muyum?</strong
                                  >
                                </span>
                              </td>
                              <td class="px-6 py-4 text-center">
                                <span
                                  class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                                >
                                  gel-<strong class="text-primary"
                                    >iyor muyum?</strong
                                  >
                                </span>
                              </td>
                              <td class="px-6 py-4 text-center">
                                <span
                                  class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                                >
                                  gör-<strong class="text-primary"
                                    >üyor muyum?</strong
                                  >
                                </span>
                              </td>
                            </tr>
                            <tr
                              class="hover:bg-primary/5 transition-colors duration-150"
                            >
                              <td class="px-6 py-4 text-center">
                                <div class="flex items-center">
                                  <div
                                    class="w-2 h-2 bg-primary rounded-full mr-3"
                                  ></div>
                                  <span
                                    class="text-sm font-semibold text-gray-900"
                                    >Sen</span
                                  >
                                </div>
                              </td>
                              <td class="px-6 py-4 text-center">
                                <span
                                  class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                                >
                                  çalış-<strong class="text-primary"
                                    >ıyor musun?</strong
                                  >
                                </span>
                              </td>
                              <td class="px-6 py-4 text-center">
                                <span
                                  class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                                >
                                  gel-<strong class="text-primary"
                                    >iyor musun?</strong
                                  >
                                </span>
                              </td>
                              <td class="px-6 py-4 text-center">
                                <span
                                  class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                                >
                                  gör-<strong class="text-primary"
                                    >üyor musun</strong
                                  >
                                </span>
                              </td>
                            </tr>
                            <tr
                              class="hover:bg-primary/5 transition-colors duration-150"
                            >
                              <td class="px-6 py-4 text-center">
                                <div class="flex items-center">
                                  <div
                                    class="w-2 h-2 bg-primary rounded-full mr-3"
                                  ></div>
                                  <span
                                    class="text-sm font-semibold text-gray-900"
                                    >O</span
                                  >
                                </div>
                              </td>
                              <td class="px-6 py-4 text-center">
                                <span
                                  class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                                >
                                  çalış-<strong class="text-primary"
                                    >ıyor mu?</strong
                                  >
                                </span>
                              </td>
                              <td class="px-6 py-4 text-center">
                                <span
                                  class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                                >
                                  gel-<strong class="text-primary">iyor mu?</strong>
                                </span>
                              </td>
                              <td class="px-6 py-4 text-center">
                                <span
                                  class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                                >
                                  gör-<strong class="text-primary">üyor mu?</strong>
                                </span>
                              </td>
                            </tr>
                            <tr
                              class="hover:bg-primary/5 transition-colors duration-150"
                            >
                              <td class="px-6 py-4 text-center">
                                <div class="flex items-center">
                                  <div
                                    class="w-2 h-2 bg-primary rounded-full mr-3"
                                  ></div>
                                  <span
                                    class="font-semibold rounded-lg text-gray-700"
                                    >Biz</span
                                  >
                                </div>
                              </td>
                              <td class="px-6 py-4 text-center">
                                <span
                                  class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                                >
                                  çalış-<strong class="text-primary"
                                    >ıyor muyuz?</strong
                                  >
                                </span>
                              </td>
                              <td class="px-6 py-4 text-center">
                                <span
                                  class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                                >
                                  gel-<strong class="text-primary"
                                    >iyor muyuz?</strong
                                  >
                                </span>
                              </td>
                              <td class="px-6 py-4 text-center">
                                <span
                                  class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                                >
                                  gör-<strong class="text-primary"
                                    >üyor muyuz?</strong
                                  >
                                </span>
                              </td>
                            </tr>
                            <tr
                              class="hover:bg-primary/5 transition-colors duration-150"
                            >
                              <td class="px-6 py-4 text-center">
                                <div class="flex items-center">
                                  <div
                                    class="w-2 h-2 bg-primary rounded-full mr-3"
                                  ></div>
                                  <span
                                    class="font-semibold rounded-lg text-gray-700"
                                    >Siz</span
                                  >
                                </div>
                              </td>
                              <td class="px-6 py-4 text-center">
                                <span
                                  class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                                >
                                  çalış-<strong class="text-primary"
                                    >ıyor musunuz?</strong
                                  >
                                </span>
                              </td>
                              <td class="px-6 py-4 text-center">
                                <span
                                  class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                                >
                                  gel-<strong class="text-primary"
                                    >iyor musunuz?</strong
                                  >
                                </span>
                              </td>
                              <td class="px-6 py-4 text-center">
                                <span
                                  class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                                >
                                  gör-<strong class="text-primary"
                                    >üyor musunuz?</strong
                                  >
                                </span>
                              </td>
                            </tr>
                            <tr
                              class="hover:bg-primary/5 transition-colors duration-150"
                            >
                              <td class="px-6 py-4 text-center">
                                <div class="flex items-center">
                                  <div
                                    class="w-2 h-2 bg-primary rounded-full mr-3"
                                  ></div>
                                  <span
                                    class="font-semibold rounded-lg text-gray-700"
                                    >Onlar</span
                                  >
                                </div>
                              </td>
                              <td class="px-6 py-4 text-center">
                                <span
                                  class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                                >
                                  çalış-<strong class="text-primary"
                                    >ıyor mu?</strong
                                  >
                                </span>
                              </td>
                              <td class="px-6 py-4 text-center">
                                <span
                                  class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                                >
                                  gel-<strong class="text-primary"
                                    >iyor mu?</strong
                                  >
                                </span>
                              </td>
                              <td class="px-6 py-4 text-center">
                                <span
                                  class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                                >
                                  gör-<strong class="text-primary"
                                    >üyor mu?</strong
                                  >
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <br>
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

                    <h2 class="text-lg font-semibold text-gray-900">
                      Examples
                    </h2>
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
                  >Sen beni gör<strong class="text-success">üyor musun?</strong>
                </span>
                —
                <em> Are you seeing me?</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Ayşe gel<strong class="text-success">iyor mu?</strong>
                </span>
                —
                <em> Is Ayşe coming?</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Çocuk kitap ok<strong class="text-success">uyor mu?</strong>
                </span>
                —
                <em> Is the child reading a book?</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Ali çalış<strong class="text-success">ıyor mu?</strong>
                </span>
                —
                <em> Is Ali working?</em>
              </span>
            </li>
          </ul>
        </div>
      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>
