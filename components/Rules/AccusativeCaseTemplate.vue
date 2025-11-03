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
            The accusative case (belirtme durumu) plays a key role in grammar by
            <span class="underline">
              identifying the specific direct object of a verb.</span
            >
            <br />
            It is used when the noun being acted upon is definite or clearly
            identified, helping to clarify which person, place, or thing is
            directly affected by the action.
          </p>
        </div>
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
          How to Form Accusative Case?
        </h2>
      </div>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            Add
            <code
              class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
            >
              ı / i / u / ü</code
            >
            <span>
              to the specific direct object of a verb according to the vowel
              harmony</span
            >
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            If the specific direct object of a verb ends in a vowel, put an
            <code
              class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
              >y</code
            >
            before (Turkish doesn't like to join vowels)
          </span>
        </li>
      </ul>
    </div>
    <br />
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
                  Last vowel
                </th>
                <th
                  class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                >
                  Accusative Ending
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
                    <span class="">-(y)ı</span>
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
                    <span>-(y)i</span>
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
                  >
                    <span>-(y)u</span>
                  </span>
                </td>
              </tr>
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4 text-center">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900"
                      >ö, ü</span
                    >
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span
                    class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                  >
                    <span>-(y)ü</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <br />
    <div class="mt-2">
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
          <h3 class="font-semibold text-gray-900 mb-2">Sentences</h3>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span class=""
                >Pencere<strong class="text-success">yi </strong> aç lütfen -
                <em>open the window please</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span class=""
                >Araba<strong class="text-success">yı </strong> alacak -
                <em>he'll buy the car</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class="">
                  Kapı<strong class="text-success">yı </strong>kapatıyorum -
                  <em>I am closing the door</em>
                </span>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class="">
                  Konu<strong class="text-success">yu </strong>konuşayalım -
                  <em>let's talk about the subject</em>
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <br />

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
            How To Form Accusative When Noun Ends With Voiceless Consonants?
          </h2>
        </div>
        <ul class="space-y-2 text-gray-700">
          <li class="flex items-start gap-2">
            <span
              class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              If applied to a noun ending with
              <code
                class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
                >ç / k / p / t</code
              >
              <br />
              <div class="mt-1">
                the last letter of that noun becomes softer and undergoes a
                consonant mutation
              </div>
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span
              class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              In that case,
              <code
                class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
                >ç -> c</code
              >
              <code
                class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
                >k -> ğ</code
              >
              <code
                class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
                >p -> b</code
              >
              <code
                class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
                >t -> d</code
              >
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
          <div class="border-l-4 border-success pl-4">
            <h3 class="font-semibold text-gray-900 mb-2">Sentences</h3>
            <ul class="space-y-1 text-sm text-gray-700">
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span>
                <span class=""
                  >Ara<strong class="text-success">ç</strong>
                  <em>(vehicle)</em> -> Araççı ara<strong class="text-success"
                    >cı yıkıyor
                  </strong>
                  <em>(the car washer is washing the vehicle)</em>
                </span>
              </li>
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span>
                <span class=""
                  >Köpe<strong class="text-success">k</strong>-> kedi
                  köpe<strong class="text-success">ği </strong>
                  kovalıyor
                  <em>(the cat is chasing the dog)</em>
                </span>
              </li>
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span>
                <span class=""
                  >Kita<strong class="text-success">p</strong>
                  <em>(book)</em> -> Bu kita<strong class="text-success"
                    >bı
                  </strong>
                  raflara koyabilir misin?
                  <em>(can you put this book on the shelves?)</em>
                </span>
              </li>
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span>
                <span class=""
                  >Sana<strong class="text-success">t</strong> <em>(art)</em> ->
                  Sana<strong class="text-success">tı </strong>
                  seviyorum
                  <em>(I love the art)</em>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <br />
      <div class="bg-gray-50 rounded-lg p-5 border border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900 mb-3">
          When To Add An Accusative Ending ?
        </h2>
        <ul class="space-y-2 text-gray-700">
          <li class="flex items-start gap-2">
            <span
              class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              <span class="font-medium"
                >The most difficult thing to know about the accusative form is
                when we should you use it and when you shouldn't.</span
              >
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span
              class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              <span class="font-medium"
                >The key distinction in using the accusative case lies in
                <strong
                  >whether the direct object is specific or
                  non-specific.</strong
                >
                <br />
                A specific direct object refers to a
                <strong
                  >particular person, place, or thing known to the
                  speaker</strong
                >
                while a non-specific direct object typically
                <strong
                  >represents a general item, person, or location belonging to a
                  broader category.</strong
                >
              </span>
            </span>
          </li>
        </ul>
      </div>
      <br />
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
                    Without Accusative Ending
                  </th>
                  <th
                    class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                  >
                    With Accusative Ending
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <span class="text-sm font-semibold text-gray-900"
                      >Araba almak alayım</span
                    >
                    - <em> Let's buy a car</em>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span class="text-sm font-semibold text-gray-900"
                      >Arabayı almak alayım</span
                    >
                    - <em> Let's buy the car</em>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <span class="text-sm font-semibold text-gray-900"
                      >Ayşe film izliyor</span
                    >
                    - <em> Ayşe watches a film</em>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span class="text-sm font-semibold text-gray-900"
                      >Ayşe filmi izliyor.</span
                    >
                    - <em> Ayşe watches the film</em>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <span class="text-sm font-semibold text-gray-900"
                      >Ben her hafta bir mektup yazıyorum</span
                    >
                    - <em> I write a letter every week</em>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span class="text-sm font-semibold text-gray-900"
                      >Ben her hafta o uzun mektubu yazıyorum</span
                    >
                    - <em> I write that long letter every week</em>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div class="bg-gray-50 rounded-lg p-5 border border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900 mb-3">
          How To Use Accusative With Pronouns ?
        </h2>
        <ul class="space-y-2 text-gray-700">
          <li class="flex items-start gap-2">
            <span
              class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              <span class="font-medium"
                >Simply add the accurate suffix following the vowel
                harmony</span
              >
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span
              class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              <span class="font-medium"
                >When the pronoun ends in a vowel, we add
                <code class="border rounded p-1">n</code> before the suffix
              </span>
            </span>
          </li>
        </ul>
      </div>
      <br />
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
                    Personal Pronoun
                  </th>
                  <th
                    class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                  >
                    Accusative Form
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Ben</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      <span class="">beni</span>
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Sen</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      <span>seni</span>
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900">O</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      <span>onu</span>
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Biz</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      <span>bize</span>
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Siz</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      <span>size</span>
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Onlar</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >onları
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <br />
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
                    Demonstrative Pronoun
                  </th>
                  <th
                    class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                  >
                    Accusative Form
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Bu</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >bunu
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Şu</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >şunu
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900">O</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >onu
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Bunlar</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >bunları
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Şunlar</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >şunları
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Onlar</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >onları
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

    <div class="bg-gray-50 mt-2 rounded-lg p-5 border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900 mb-3">
        How To Use Accusative With Locative Pronouns ?
      </h2>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <span class="font-medium"
              >Add the accurate suffix following the vowel harmony</span
            >
          </span>
        </li>
      </ul>
    </div>
    <br />
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
                  Locative Pronoun
                </th>
                <th
                  class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                >
                  Accusative Form
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900"
                      >Ne(re)</span
                    >
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span
                    class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                  >
                    <span class="">nereyi</span>
                  </span>
                </td>
              </tr>
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900"
                      >Bu(ra)</span
                    >
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span
                    class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                  >
                    <span class="">burayı</span>
                  </span>
                </td>
              </tr>
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4 text-center">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900"
                      >Şu(ra)</span
                    >
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span
                    class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                  >
                    <span>şurayı</span>
                  </span>
                </td>
              </tr>
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4 text-center">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900"
                      >O(ra)</span
                    >
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span
                    class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                  >
                    <span>orayı</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
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
        <h2 class="text-lg font-semibold text-gray-900">General Exceptions</h2>
      </div>
      <div class="mt-2 space-y-4">
        <!-- Proper Names -->
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">
            Nouns with vowels that disappear
          </h3>
          <p class="mb-2 italic">
            Some words that contain a vowel before their last consonant lost
            them when adding the accusative form
          </p>

          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span class=""
                >Fikir <em>(idea)</em> -> Bu
                <strong class="text-amber-500">fikri </strong>çok ilginç
                <em>(this idea is very interesting)</em>
              </span>
            </li>

            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span class=""
                >Şehir <em>(city)</em> -> Bu hafta
                <strong class="text-amber-500">şehri </strong>geziyoruz
                <em>(this week we explore this city)</em>
              </span>
            </li>
          </ul>
        </div>
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">Imported words</h3>
          <p class="mb-2 italic">Some imported words break the vowel harmony</p>

          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span class=""
                >Kontrolü <em>(control)</em> -> Kontrol<strong
                  class="text-amber-500"
                  >ü
                </strong>
                kaybediyorum
                <em>(I am losing control)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span class=""
                >Saat <em>(time/watch)</em> -> Teyzene saat<strong
                  class="text-amber-500"
                  >i
                </strong>
                ver
                <em>(give the watch to your aunt)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span class=""
                >Saat <em>(time/watch)</em> -> Teyzene saat<strong
                  class="text-amber-500"
                  >i
                </strong>
                ver
                <em>(give the watch to your aunt)</em>
              </span>
            </li>
          </ul>
        </div>
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">
            Single-syllable words
          </h3>
          <p class="mb-2 italic">
            Some single-syllable words ending in a consonnant double their
            consonnant when put at the accusative form
          </p>

          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span class=""
                >Hat <em>(line)</em> -> Yeni hatt<strong class="text-amber-500"
                  >ı
                </strong>
                kullanıyorum
                <em>(I am using the new line)</em>
              </span>
            </li>
          </ul>
        </div>
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">Words ending in nk</h3>
          <p class="mb-2 italic">
            Some words ending in <strong>nk</strong> becomes <strong>ng</strong>
          </p>

          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span class=""
                >Renk <em>(color)</em> -> Oturma odamızın duvarları için bu
                <strong class="text-amber-500">rengi </strong> seçtim
                <em
                  >(for the walls of our new living room I chose this color)</em
                >
              </span>
            </li>
          </ul>
        </div>
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">Pronouns</h3>
          <p class="mb-2 italic">
            As seen before some personal and demonstrative pronouns get
            <strong>n</strong> at the accusative
          </p>

          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span class=""
                >O <em>(he/she/it)</em> -> Babana
                <strong class="text-amber-500">onu </strong> ver
                <em>(give that to your father)</em>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
