<template>
  <div class="max-w-4xl mx-auto p-6">
    <!-- Header -->
    <div class="border border-primary bg-primary text-white rounded-lg p-4">
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
            Basic vocabulary comes with numbers and spatial directions. In this
            lesson, you'll learn numbers easily from
            <span class="underline">zero to a billion</span>! <br />
            Additionnaly, let's focus on
            <span class="underline">cardinal directions</span> and figure out
            how to share <span class="underline">spatial directions</span>.
          </p>
        </div>
      </div>
    </div>
    <br />
    <!-- Important Primary section -->
    <div class="bg-primary/10 rounded-lg p-5 border border-gray-200 mt-6">
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
          Numbers Are Simpler in Turkish
        </h2>
      </div>

      <p class="text-gray-700 mb-3">
        While counting from 1 to 10 is often the first step in any language,
        Turkish numbers stay refreshingly consistent even as they get larger.
      </p>

      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <strong class="mr-2">English inconsistency:</strong> "One" becomes
            "first" — two totally different words
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <strong class="mr-2">Turkish advantage:</strong> More logical and
            regular patterns throughout
          </span>
        </li>
      </ul>
    </div>
    <br />
    <!-- Groups Template -->
    <div
      class="bg-gray-50 border-base-200 rounded-xl p-5 border shadow-sm mt-6"
    >
      <div class="flex items-center gap-3 mb-6">
        <h2 class="text-xl font-bold text-gray-900">
          Counting: the figures and numbers from 11-99
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-8 h-8 bg-neutral/70 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">F</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Start with 0–9</h3>
          </div>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="text-2xl m-auto font-bold text-gray-700">
                0 : sıfır
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="text-sm m-auto text-gray-600 font-medium">
                1 – bir, 2 – iki, 3 – üç, 4 – dört, 5 – beş
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="text-sm m-auto text-gray-600 font-medium">
                6 – altı, 7 – yedi, 8 – sekiz, 9 – dokuz
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
              <span class="text-neutral font-bold text-sm">N</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">From 10–99</h3>
          </div>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="text-2xl m-auto font-bold text-gray-700">
                tens digit + figure
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="text-sm m-auto text-gray-600 font-medium">
                47 = kırk yedi ("forty-seven")
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="text-sm m-auto text-gray-600 font-medium">
                89 = seksen dokuz ("eighty-nine")
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <!-- Table Template -->
    <div class="mt-6">
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
                  Multiples of Ten
                </th>
                <th
                  class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                >
                  Turkish Word
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
                    <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900">20</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >yirmi</span
                  >
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >23 = yirmi üç</span
                  >
                </td>
              </tr>
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900">30</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >otuz</span
                  >
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >33 = otuz bir</span
                  >
                </td>
              </tr>
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900">40</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >kırk</span
                  >
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >47 = kırk yedi</span
                  >
                </td>
              </tr>
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900">50</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >elli</span
                  >
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >56 = elli altı</span
                  >
                </td>
              </tr>
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900">60</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >altmış</span
                  >
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >65 = altmış beş</span
                  >
                </td>
              </tr>
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900">70</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >yetmiş</span
                  >
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >74 = yetmiş dört</span
                  >
                </td>
              </tr>
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900">80</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >seksen</span
                  >
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >88 = seksen sekiz</span
                  >
                </td>
              </tr>
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900">90</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >doksan</span
                  >
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >93 = doksan uç</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <br />
    <!-- Primary important section with code samples -->
    <div class="bg-primary/10 rounded-lg p-5 border border-gray-200 mt-6">
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
          Bigger Numbers Are Just as Simple
        </h2>
      </div>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <code
              class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
              >100</code
            >
            –
            <code
              class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
              >yüz</code
            >
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <code
              class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
              >1,000</code
            >
            –
            <code
              class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
              >bin</code
            >
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <code
              class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
              >1,000,000</code
            >
            –
            <code
              class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
              >milyon</code
            >
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <code
              class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
              >1,000,000,000</code
            >
            –
            <code
              class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
              >milyar</code
            >
          </span>
        </li>
      </ul>
    </div>
    <br />
    <!-- Many usages section -->
    <div class="bg-primary/10 rounded-lg p-5 border border-gray-200 mt-6">
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
          Complex Number Examples
        </h2>
      </div>
      <p class="font-semibold text-gray-700 mb-3">
        Just stack them together following the same logical pattern
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">1,762</h3>
          <p class="font-medium text-gray-900 mb-2">Complex Number</p>
          <div class="text-gray-700">
            <span class="font-medium">bin yedi yüz altmış iki</span>
            <em>(one thousand seven hundred sixty-two)</em>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">45,678</h3>
          <p class="font-medium text-gray-900 mb-2">Complex Number</p>
          <div class="text-gray-700">
            <span class="font-medium">kırk beş bin altı yüz yetmiş sekiz</span>
            <em>(forty-five thousand six hundred seventy-eight)</em>
          </div>
        </div>
      </div>
    </div>
    <br />
    <!-- Examples section -->
    <div class="mt-6">
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
          Ordinal Numbers (1st, 2nd, 3rd…)
        </h2>
      </div>

      <div class="space-y-4">
        <div class="border-l-4 border-success pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">Easy Pattern</h3>
          <p class="text-gray-700 text-sm mb-2">
            Turkish ordinal numbers follow an easy pattern—just add a suffix to
            the regular number
          </p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >1st = <strong class="text-success">birinci</strong></span
                >
                <em>(first)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >2nd = <strong class="text-success">ikinci</strong></span
                >
                <em>(second)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >3rd = <strong class="text-success">üçüncü</strong></span
                >
                <em>(third)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >4th = <strong class="text-success">dördüncü</strong></span
                >
                <em>(fourth)</em>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <br />
    <!-- Directions Section -->
    <div id="directions" class="mt-6">
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
            Asking and Giving Directions in Turkish
          </h2>
        </div>
        <p class="text-gray-700 mb-3">
          Learning to ask and give directions is one of the most practical
          skills in Turkish. Let's begin with a simple and essential question
          word: <strong>nerede</strong> (where).
        </p>
      </div>
      <br />
      <!-- Primary important section with code samples -->
      <div class="bg-primary/10 rounded-lg p-5 border border-gray-200 mt-6">
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
            How to Ask "Where?"
          </h2>
        </div>
        <ul class="space-y-2 text-gray-700">
          <li class="flex items-start gap-2">
            <span
              class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              The structure is consistent and easy to remember:
              <code
                class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
                >[Object] + nerede?</code
              >
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span
              class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              Always place
              <code
                class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
                >nerede</code
              >
              at the end of the sentence—it's that simple!
            </span>
          </li>
        </ul>
      </div>
      <br />
      <!-- Examples section -->
      <div class="mt-6">
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
          <div class="border-l-4 border-success pl-4">
            <h3 class="font-semibold text-gray-900 mb-2">Basic Questions</h3>
            <p class="text-gray-700 text-sm mb-2">
              Simple and practical questions you'll use every day
            </p>
            <ul class="space-y-1 text-sm text-gray-700">
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span>
                <span>Kafe nerede? <em>(Where is the café?)</em></span>
              </li>
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span>
                <span
                  >Otobüs durağı nerede? <em>(Where is the bus stop?)</em></span
                >
              </li>
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span>
                <span>Araba nerede? <em>(Where is the car?)</em></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <br />
      <!-- Table Template for Direction Phrases -->
      <div class="mt-6">
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
                    English
                  </th>
                  <th
                    class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                  >
                    Turkish
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Go straight ahead</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >Düz git</span
                    >
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Turn left</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >Sola dön</span
                    >
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Turn right</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >Sağa dön</span
                    >
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Go back</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >Geri git</span
                    >
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Cross over</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >Karşıya geç</span
                    >
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Turn right at the corner</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >Köşeden sağa dön</span
                    >
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Turn left at the corner</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >Köşeden sola dön</span
                    >
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Street</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >Sokak</span
                    >
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Main road</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >Cadde</span
                    >
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Road</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >Yol</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <br />
      <!-- Many usages section for giving directions -->
      <div class="bg-primary/10 rounded-lg p-5 border border-gray-200 mt-6">
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
            How to Give Directions ?
          </h2>
        </div>
        <p class="font-semibold text-gray-700 mb-3">
          As millions of tourists visit Turkey each year, knowing how to give
          directions is both helpful and polite. Here are key phrases to get you
          started.
        </p>
      </div>
      <br />
      <!-- Examples section for Cardinal Directions -->
      <div class="mt-6">
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
          <h2 class="text-lg font-semibold text-gray-900">Navigation Terms</h2>
        </div>
        <div class="space-y-4">
          <div class="border-l-4 border-success pl-4">
            <h3 class="font-semibold text-gray-900 mb-2">
              Cardinal directions
            </h3>
            <p class="text-gray-700 text-sm mb-2">
              These are mostly used in transportation (e.g., air and sea)
            </p>
            <ul class="space-y-1 text-sm text-gray-700">
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span
                ><span
                  >North – <strong class="text-success">Kuzey</strong></span
                >
              </li>
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span
                ><span
                  >South – <strong class="text-success">Güney</strong></span
                >
              </li>
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span
                ><span>East – <strong class="text-success">Doğu</strong></span>
              </li>
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span
                ><span>West – <strong class="text-success">Batı</strong></span>
              </li>
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span
                ><span
                  >Northeast –
                  <strong class="text-success">Kuzeydoğu</strong></span
                >
              </li>
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span
                ><span
                  >Northwest –
                  <strong class="text-success">Kuzeybatı</strong></span
                >
              </li>
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span
                ><span
                  >Southeast –
                  <strong class="text-success">Güneydoğu</strong></span
                >
              </li>
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span
                ><span
                  >Southwest –
                  <strong class="text-success">Güneybatı</strong></span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>
