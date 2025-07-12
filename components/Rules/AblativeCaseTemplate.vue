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
            In Turkish, the ablative case (Uzaklaşma Durumu) is primarily used
            to
            <span class="underline"
              >indicate a separation or movement away from a place, object, or
              person. </span
            ><br />
            It conveys notions such as origin, comparison and cause. It can
            often be translated with "from" in English. This case is essential
            for expressing various forms of distancing.
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
          How to Form Ablative Case?
        </h2>
      </div>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            The ablative case helps to answer the question
            <strong class="text-primary">"Nereden?"</strong> -
            <em>Where from?</em>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            It's primarily used to indicate the origin or provenance of
            something.
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            We form it by adding <strong class="text-primary">-dan</strong> or
            <strong class="text-primary">-den</strong> to the noun according to
            the vowel harmony.<br />
          </span>
        </li>
      </ul>
    </div>
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
            <h3 class="text-lg font-semibold text-gray-900">
              Last noun's vowel: Hard
            </h3>
          </div>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="text-2xl m-auto font-bold text-gray-700">
                a, ı, o, u
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="text-lg m-auto text-gray-600 font-bold text-primary">
                suffix -> -dan
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
            <h3 class="text-lg font-semibold text-gray-900">
              Last noun's vowel: Soft
            </h3>
          </div>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="text-2xl m-auto font-bold text-gray-700">
                e, i, ö, ü
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="text-lg m-auto text-gray-600 font-bold text-primary">
                suffix -> -den
              </div>
            </div>
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
        <div class="border-l-4 border-success pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">Sentences</h3>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span class=""
                ><strong class="text-success">Nereden </strong> geliyor musun?
                <em>(where are you coming from?)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span class=""
                ><strong class="text-success">Evden </strong>geliyorum
                <em>(i am coming from home)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class="">
                  Kavuz<strong class="text-success">dan </strong>çık
                  <em>(get out of the swimming pool)</em>
                </span>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class="">
                  Arkadaşım<strong class="text-success">dan </strong>mektup
                  aldım <em>(I received a letter from a friend)</em>
                </span>
              </span>
            </li>
          </ul>
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
          <h2 class="text-lg font-semibold text-gray-900">Exceptions</h2>
        </div>
        <div class="mt-2 space-y-4">
          <!-- Proper Names -->
          <div class="border-l-4 border-amber-200 pl-4">
            <h3 class="font-semibold text-gray-900 mb-2">
              Some words imported to Turkish do not follow vowel harmony in the
              ablative case
            </h3>

            <ul class="space-y-1 text-sm text-gray-700">
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
                ></span>
                <span>
                  <span class=""
                    >Gol<strong class="text-amber-600">den</strong> önce faul
                    var
                  </span>
                  -
                  <em>there is a fault before the goal</em>
                </span>
              </li>
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
                ></span>
                <span>
                  <span class=""
                    >Saat<strong class="text-amber-600">ten</strong> önce dışarı
                    çıkmam
                  </span>
                  -
                  <em>I don't go out before the time</em>
                </span>
              </li>
            </ul>
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
            How To Form Ablative When Noun Ends With Voiceless Consonants?
          </h2>
        </div>
        <ul class="space-y-2 text-gray-700">
          <li class="flex items-start gap-2">
            <!-- <span
              class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
            /> -->
            <span>
              After a noun ending with
              <code
                class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
                >ç / f / h / k / p / s / ş / t</code
              >
              <br />
              <div class="mt-3">
                <code
                  class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
                  >-dan/-den</code
                >
                becomes
                <code
                  class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
                  >-tan/-ten</code
                >
              </div>
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
                  >Erkek çocuk otobüs<strong class="text-success">ten </strong>
                  indiyor
                  <em>(the little boy leaves the bus)</em>
                </span>
              </li>
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span>
                <span class=""
                  >Kitap<strong class="text-success">tan </strong>çok şey
                  öğrendim
                  <em>(I learned many things from the book)</em>
                </span>
              </li>
              <li class="flex items-start gap-2">
                <span
                  class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
                ></span>
                <span>
                  <span class="">
                    Yolcular uçak<strong class="text-success">tan </strong
                    >iniyor <em>(the travelers go down from the plane)</em>
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <br />

      <br />
      <div class="bg-gray-50 rounded-lg p-5 border border-gray-200">
        <h2 class="text-lg font-semibold text-gray-900 mb-3">
          How To Use Ablative With Pronouns ?
        </h2>
        <ul class="space-y-2 text-gray-700">
          <li class="flex items-start gap-2">
            <span
              class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              <span class="font-medium"
                >You get the ablative forms of personal and demonstrative
                pronouns <strong>by adding -den/-dan</strong></span
              >
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span
              class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              <span class="font-medium"
                >If the pronoun ends in a vowel,
                <strong>"n" is added before -dan</strong></span
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
                    Personal Pronoun
                  </th>
                  <th
                    class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                  >
                    Ablative Form
                  </th>
                  <th
                    class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                  >
                    Meaning
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
                      <span class="">benden</span>
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      <span class="">from me</span>
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
                      <span>senden</span>
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      <span class="">from you</span>
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
                      <span>ondan</span>
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      <span class="">from him/her</span>
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Biz</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      <span>bizden</span>
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      <span class="">from us</span>
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
                      <span>sizden</span>
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      <span class="">from you (plur)</span>
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
                      >onlardan
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      <span class="">from them</span>
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
                    Ablative Form
                  </th>
                  <th
                    class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                  >
                    Meaning
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Bu</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >bundan
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >from this
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Şun</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >şundan
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >from this/that
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
                      >ondan
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >from him/her/that
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >bunlar</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >bunlardan
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >from these
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >şunlar</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >şunlardan
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >from these/those
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >onlar</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >onlardan
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >from them/those
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

    <div class="bg-gray-50 rounded-lg p-5 border border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900 mb-3">
            How To Use Ablative With Locative Pronouns ?
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
        <br>
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
                    Ablative Form
                    </th>
                    <th
                      class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                    >
                      Meaning
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                    <tr class="hover:bg-primary/5 transition-colors duration-150">
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                        <span class="text-sm font-semibold text-gray-900"
                          >Ne(re)</span
                        >
                      </div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        <span class="">nereden</span>
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        <span class="">from where</span>
                      </span>
                    </td>
                  </tr>
                  <tr class="hover:bg-primary/5 transition-colors duration-150">
                    <td class="px-6 py-4">
                      <div class="flex items-center">
                        <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                        <span class="text-sm font-semibold text-gray-900"
                          >Bu(ra)</span
                        >
                      </div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        <span class="">buradan</span>
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        <span class="">from here</span>
                      </span>
                    </td>
                  </tr>
                  <tr class="hover:bg-primary/5 transition-colors duration-150">
                    <td class="px-6 py-4 text-center">
                      <div class="flex items-center">
                        <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                        <span class="text-sm font-semibold text-gray-900"
                          >Şu(ra)</span
                        >
                      </div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        <span>şuradan</span>
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        <span class="">from here/there</span>
                      </span>
                    </td>
                  </tr>
                  <tr class="hover:bg-primary/5 transition-colors duration-150">
                    <td class="px-6 py-4 text-center">
                      <div class="flex items-center">
                        <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                        <span class="text-sm font-semibold text-gray-900">O(ra)</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        <span>oradan</span>
                      </span>
                    </td>
                    <td class="px-6 py-4 text-center">
                      <span
                        class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >
                        <span class="">from there</span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
    <br />
    <!-- Four Essential Forms -->
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
      <p class="font-semibold text-gray-700 mb-3">
        Apart from defining an origin, the ablative case can be used in
        different contexts:
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">Made comparisons</h3>
          <p class="font-medium text-gray-900 mb-2">-dan/-den daha ...</p>
          <div class="text-gray-700">
            <span class="font-medium"
              >Ayşe Can<strong class="text-primary">'dan daha</strong>
              buyük</span
            >
            -
            <em>Ayşe is taller than Can</em>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">
            Meaning <code class="border rounded p-1">one of/a few of</code>
          </h3>
          <p class="font-medium text-gray-900 mb-2">
            noun at at the plural + 'dan/den'
          </p>
          <div class="text-gray-700">
            <span class="font-medium"
              >Ağaclar<strong class="text-primary">dan biri</strong></span
            >
            - <em>One of the trees</em>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">Indicate composition</h3>
          <p class="font-medium text-gray-900 mb-2">noun + -dan/-den</p>
          <div class="text-gray-700">
            <span class="font-medium"
              >Kar<strong class="text-primary">dan</strong> top</span
            >
            - <em>snowball (ball from snow)</em>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">
            Meaning <code class="border rounded p-1">through/out</code>
          </h3>
          <p class="font-medium text-gray-900 mb-2">noun + -dan/-den</p>
          <div class="text-gray-700">
            <span class="font-medium">
              Pencere<strong class="text-primary">den </strong>bak</span
            >
            - <em>look through the window</em>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">
            Meaning <code class="border rounded p-1">before/after</code>
          </h3>
          <p class="font-medium text-gray-900 mb-2">
            noun + -dan/-den sonra/önce
          </p>
          <div class="text-gray-700">
            <span class="font-medium">Yarın<strong>den önce </strong> gel</span>
            - <em>come before tomorrow</em>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">Showing a cause/reason</h3>
          <p class="font-medium text-gray-900 mb-2">cause + -dan/-den</p>
          <div class="text-gray-700">
            <span class="font-medium"
              >Mutluluk<strong>tan </strong> ağladı</span
            >
            - <em>we cried of happiness</em>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">Expressing feelings</h3>
          <p class="font-medium text-gray-900 mb-2">
            -den + verb about feelings
          </p>
          <div class="text-gray-700">
            <span class="font-medium"
              >Yalnız yemek yemek<strong>ten</strong> çok hoşlanıyorum</span
            >
            - <em>I love eating alone</em>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">To give directions</h3>
          <p class="font-medium text-gray-900 mb-2">markpoint + -dan/-den</p>
          <div class="text-gray-700">
            <span class="font-medium">Şura<strong>dan</strong> dön</span>
            - <em>Turn over there</em>
          </div>
        </div>
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
        <h3 class="font-semibold text-gray-900 mb-2">Make comparisons</h3>
        <p class="text-gray-700 text-sm mb-2">
          <span class="font-semibold">-dan/-den + daha </span> means "more ...
          than ..."
        </p>
        <ul class="space-y-1 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" ></span>
            <span>
              <span class=""
                >Bu kitap o kitap<strong class="text-success">tan daha </strong
                >ilginç - <em>This book is more interesting than that one</em>
              </span>
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" ></span>
            <span>
              <span class=""
                >Ben sen<strong class="text-success">den daha </strong>hızlı
                koşuyorum - <em> I run faster than you</em>
              </span>
            </span>
          </li>
        </ul>
      </div>
      <div class="border-l-4 border-success pl-4">
        <h3 class="font-semibold text-gray-900 mb-2">
          Meaning <code class="border rounded p-1">one of/a few of</code>
        </h3>
        <ul class="space-y-1 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" ></span>
            <span>
              <span class=""
                >Adamlar<strong class="text-success">dan biri </strong> seninle
                konuşmak istiyor - <em>one of the men want to speak to you</em>
              </span>
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" ></span>
            <span>
              <span class=""
                >Meyveler<strong class="text-success">den birkaç </strong>
                tanesi çürük - <em>a few of the fruits are rotten</em>
              </span>
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" ></span>
            <span>
              <span class=""
                >Bunlar<strong class="text-success">dan 5 tane </strong>
                istiyorum - <em>I want 5 of these</em>
              </span>
            </span>
          </li>
        </ul>
      </div>
      <div class="border-l-4 border-success pl-4">
        <h3 class="font-semibold text-gray-900 mb-2">
          Indicating composition/materials
        </h3>
        <ul class="space-y-1 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" ></span>
            <span>
              <span class=""
                >Bu poşetler plastik<strong class="text-success">ten </strong
                >yapılmıştır - <em>these bags are made of plastic</em>
              </span>
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" ></span>
            <span>
              <span class=""
                >Bu cam<strong class="text-success"
                  >dan masayı köşeye koy</strong
                >
                - <em>put this table of glass in the corner</em>
              </span>
            </span>
          </li>
        </ul>
      </div>
      <div class="border-l-4 border-success pl-4">
        <h3 class="font-semibold text-gray-900 mb-2">
          Meaning <code class="border rounded p-1">through/out</code>
        </h3>
        <p class="text-gray-700 text-sm mb-2">
          To specify where something or someone is we use the locative form
        </p>
        <ul class="space-y-1 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" ></span>
            <span>
              <span class=""
                >Anahtarları cam<strong class="text-success">dan </strong>bana
                at - <em>throw me the keys through the window</em>
              </span>
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" ></span>
            <span>
              <span class=""
                >Bu cam
                <strong class="text-success">dan masayı köşeye koy</strong
                >yapılmıştır - <em>Put this table of glass in the corner</em>
              </span>
            </span>
          </li>
        </ul>
      </div>
      <div class="border-l-4 border-success pl-4">
        <h3 class="font-semibold text-gray-900 mb-2">
          Meaning <code class="border rounded p-1">before/after</code>
        </h3>
        <ul class="space-y-1 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" ></span>
            <span>
              <span class=""
                >Saat sekiz<strong class="text-success">en önce </strong>gel -
                <em>come before 8 o'clock</em>
              </span>
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" ></span>
            <span>
              <span class=""
                >10 Kasım <strong class="text-success">’dan sonra</strong> her
                şey değişiyor -
                <em>everything changes after the 10th November</em>
              </span>
            </span>
          </li>
        </ul>
      </div>
      <div class="border-l-4 border-success pl-4">
        <h3 class="font-semibold text-gray-900 mb-2">Showing a cause/reason</h3>
        <ul class="space-y-1 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" ></span>
            <span>
              <span class=""
                >Yağmur<strong class="text-success">dan </strong>evde kalıyor -
                <em>he stays at home because of the rain</em>
              </span>
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" ></span>
            <span>
              <span class=""
                >On<strong class="text-success">dan </strong>geç kalıyorsun -
                <em>you are late because of that</em>
              </span>
            </span>
          </li>
        </ul>
      </div>
      <div class="border-l-4 border-success pl-4">
        <h3 class="font-semibold text-gray-900 mb-2">Expressing feelings</h3>
        <p class="font-medium text-gray-900 mb-2">
          A few verbal expressions about feelings come with the ablative case
        </p>
        <ul class="space-y-1 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" ></span>
            <span>
              <span class=""
                >Kız kardeşim örumcek<strong class="text-success">ten </strong
                >korkuyor - <em>my sister is afraid of spiders</em>
              </span>
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" ></span>
            <span>
              <span class=""
                >Havuzda yüzmek<strong class="text-success">ten </strong
                >hoşlanıyoruz - <em>we love to swim in the pool</em>
              </span>
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0" ></span>
            <span>
              <span class=""
                >Mehmet fare<strong class="text-success">den çekiniyor</strong
                >yapılmıştır - <em>Mehmet fears mouses</em>
              </span>
            </span>
          </li>
        </ul>
      </div>

      <div class="text-gray-700">
        <div class="border-l-4 border-success pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">To give directions</h3>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Işıklar<strong class="text-success">dan </strong>düz devam
                  edin - <em>Keep going straight at the traffic lights</em>
                </span>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Bu cam
                  <strong class="text-success">dan masayı köşeye koy</strong
                  >yapılmıştır - <em>Put this table of glass in the corner</em>
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
