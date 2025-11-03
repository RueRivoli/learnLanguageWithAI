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
            content
            <span class="underline">underlined_content</span>
          </p>
        </div>
      </div>
    </div>
    <!-- End Header -->

    <!-- Groups Template -->
    <div class="bg-gray-50 border-base-200 rounded-xl p-5 border shadow-sm">
      <div class="flex items-center gap-3 mb-6">
        <h2 class="text-xl font-bold text-gray-900">Groups</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-8 h-8 bg-neutral/70 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">A</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Group A</h3>
          </div>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="text-2xl m-auto font-bold text-gray-700">
                caracteristics
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="text-sm m-auto text-gray-600 font-medium">
                second caracteristics
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
              <span class="text-neutral font-bold text-sm">B</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Group B</h3>
          </div>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="text-2xl m-auto font-bold text-gray-700">
                characteristics
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="text-sm m-auto text-gray-600 font-medium">
                second characteristics
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Groups template -->

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

        <h2 class="text-lg font-semibold text-gray-900">Title</h2>
      </div>

      <p class="text-gray-700 mb-3">general explanation</p>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <strong class="mr-2">sth</strong> calls<strong class="ml-2"
              >sth</strong
            >
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <strong class="mr-2">sth</strong> calls
            <strong class="ml-2">sth</strong>
          </span>
        </li>
      </ul>
    </div>
    <!-- End Important Primary Section -->

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
          How to ... <i>text</i> ...?
        </h2>
      </div>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            if ...
            <code
              class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
              >characters</code
            >
            <br />
            <div class="mt-1">text</div>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            text
            <code
              class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
              >x -> x</code
            >
            <code
              class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
              >x -> x</code
            >
            <code
              class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
              >x -> x</code
            >
            <code
              class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
              >x -> x</code
            >
          </span>
        </li>
      </ul>
    </div>
    <!-- End Primary important section with code samples -->

    <!-- Primary important section with steps -->
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

        <h2 class="text-lg font-semibold text-gray-900">How to... ?</h2>
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
              >-er/-ar/-ır/-ir/-ur/-ür/-or/-ör</code
            >
            based on vowel harmony
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <strong>Step 3:</strong> Add
            <code class="bg-white px-2 py-1 rounded border text-sm"
              >-mez/-maz</code
            >
            based on vowel harmony
          </span>
        </li>
      </ul>
    </div>
    <!-- End Primary important section with steps -->

    <br />

    <!-- Info gray section -->
    <div class="bg-gray-50 rounded-lg p-5 border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900 mb-3">How To ... ?</h2>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <span class="font-medium">text <strong>strongtext</strong></span>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <span class="font-medium">txt <strong>text</strong></span>
          </span>
        </li>
      </ul>
    </div>
    <!-- End Info gray section -->

    <!-- 
    Many usages section -->
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

        <h2 class="text-lg font-semibold text-gray-900">Many usages</h2>
      </div>
      <p class="font-semibold text-gray-700 mb-3">general explanation</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">Usage 1</h3>
          <p class="font-medium text-gray-900 mb-2">structure</p>
          <div class="text-gray-700">
            <span class="font-medium"
              >sentence<strong class="text-primary"> strongtxt</strong>
            </span>
            -
            <em>translation</em>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">Usage 2</h3>
          <p class="font-medium text-gray-900 mb-2">structure</p>
          <div class="text-gray-700">
            <span class="font-medium"
              >sentence<strong class="text-primary"> strongtxt</strong>
            </span>
            -
            <em>translation</em>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">Usage 3</h3>
          <p class="font-medium text-gray-900 mb-2">structure</p>
          <div class="text-gray-700">
            <span class="font-medium"
              >sentence<strong class="text-primary"> strongtxt</strong>
            </span>
            -
            <em>translation</em>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">Usage 4</h3>
          <p class="font-medium text-gray-900 mb-2">structure</p>
          <div class="text-gray-700">
            <span class="font-medium"
              >sentence<strong class="text-primary"> strongtxt</strong>
            </span>
            -
            <em>translation</em>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">Usage 5</h3>
          <p class="font-medium text-gray-900 mb-2">structure</p>
          <div class="text-gray-700">
            <span class="font-medium"
              >sentence<strong class="text-primary"> strongtxt</strong>
            </span>
            -
            <em>translation</em>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">Usage 6</h3>
          <p class="font-medium text-gray-900 mb-2">structure</p>
          <div class="text-gray-700">
            <span class="font-medium"
              >sentence<strong class="text-primary"> strongtxt</strong>
            </span>
            -
            <em>translation</em>
          </div>
        </div>
      </div>
    </div>
    <!-- 
    End Many usages section -->

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
          <h3 class="font-semibold text-gray-900 mb-2">
            First type of examples
          </h3>
          <p class="text-gray-700 text-sm mb-2">explanation</p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >turkish word <em>(translation)</em> -> turkish example<strong
                    class="text-success"
                    >x</strong
                  >
                </span>
                <em>(sentence translation)</em> — explanation
                <em>(+)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >turkish word <em>(translation)</em> -> turkish example<strong
                    class="text-success"
                    >x</strong
                  >
                </span>
                <em>(sentence translation)</em> — explanation
                <em>(+)</em>
              </span>
            </li>
          </ul>
        </div>
        <br />
        <div class="border-l-4 border-success pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">
            Second type of examples
          </h3>
          <p class="text-gray-700 text-sm mb-2">explanation</p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >turkish word <em>(translation)</em> -> turkish example<strong
                    class="text-success"
                    >x</strong
                  >
                </span>
                <em>(sentence translation)</em> — explanation
                <em>(+)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >turkish word <em>(translation)</em> -> turkish example<strong
                    class="text-success"
                    >x</strong
                  >
                </span>
                <em>(sentence translation)</em> — explanation
                <em>(+)</em>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- End Exemples section -->

    <br />

    <!-- Table Template -->

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
                  First column
                </th>
                <th
                  class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                >
                  Second column
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900"
                      >values</span
                    >
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span
                    class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                  >
                    <span class="">values</span>
                  </span>
                </td>
              </tr>
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4 text-center">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900"
                      >values</span
                    >
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span
                    class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                  >
                    <span>values</span>
                  </span>
                </td>
              </tr>
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4 text-center">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900"
                      >values</span
                    >
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span
                    class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                  >
                    <span>values</span>
                  </span>
                </td>
              </tr>
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4 text-center">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900"
                      >values</span
                    >
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span
                    class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                  >
                    <span>values</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- End Table Template -->

    <br />

    <!-- Exceptions template examples -->
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
        <h2 class="text-lg font-semibold text-gray-900">
          Special Cases & Exceptions
        </h2>
      </div>
      <p class="mt-2 mb-3 font-semibold">general explanation</p>
      <div class="space-y-4">
        <!-- Proper Names -->
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">First exceptions</h3>

          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >turkish word →
                  <span class="line-through">turkish example</span>
                  <strong class="text-amber-600">x</strong>end</span
                >
                -
                <em>translation</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >turkish word →
                  <span class="line-through">turkish example</span>
                  <strong class="text-amber-600">x</strong>end</span
                >
                -
                <em>translation</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >turkish word →
                  <span class="line-through">turkish example</span>
                  <strong class="text-amber-600">x</strong>end</span
                >
                -
                <em>translation</em>
              </span>
            </li>
          </ul>
        </div>
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">
            Second type of exceptions
          </h3>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >turkish word →
                  <span class="line-through">turkish example</span>
                  <strong class="text-amber-600">x</strong>end</span
                >
                -
                <em>translation</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >turkish word →
                  <span class="line-through">turkish example</span>
                  <strong class="text-amber-600">x</strong>end</span
                >
                -
                <em>translation</em>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- End Exceptions template examples -->
  </div>
</template>
