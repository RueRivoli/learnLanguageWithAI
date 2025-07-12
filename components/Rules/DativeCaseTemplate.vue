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
          In English, when doing an action with a direction, we use "to" or "towards".
          In Turkish, <span class="underline">we use the dative case.</span></p>
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

      <h2 class="text-lg font-semibold text-gray-900">How to Form Dative Case?</h2>
    </div>
    <ul class="space-y-2 text-gray-700">
      <li class="flex items-start gap-2">
        <span
          class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
        ></span>
        <span>
          The dative case is the case to show <strong class="text-primary">a direction or a movement towards something or someone</strong> <br/>
          It's the case to answer the question <strong class="text-primary">"Nereye?"</strong> - <em>Where to?</em>
        </span>
      </li>
      <li class="flex items-start gap-2">
        <span
          class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
        ></span>
        <span>
          We form it by adding <strong class="text-primary">-(y)a</strong> or <strong class="text-primary">-(y)e</strong> to the noun according to the vowel harmony.<br/>
          If the suffix is to be added to a noun finishing in a vowel, an y is added
        </span>
      </li>
    </ul>
  </div>
  <br>
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
          <h3 class="text-lg font-semibold text-gray-900">Last noun's vowel: Hard</h3>
        </div>
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <div class="text-2xl m-auto font-bold text-gray-700">
              a, ı, o, u
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div class="text-lg m-auto text-gray-600 font-bold text-primary">
              suffix -> (y)*a
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
          <h3 class="text-lg font-semibold text-gray-900">Last noun's vowel: Soft</h3>
        </div>
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <div class="text-2xl m-auto font-bold text-gray-700">
              e, i, ö, ü 
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div class="text-lg m-auto text-gray-600 font-bold text-primary">
              suffix -> (y)*e
            </div>
          </div>
        </div>
      </div>
      <p class="mt-2 font-semibold text-gray-700">
        *y if the noun ends in a vowel
      </p>
    </div>
    
  </div>
  <br>
  <div>
      <h2 class="text-lg font-semibold text-gray-900 mb-3">
        Non-exhaustive list of verbs requiring the dative case
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
                    Verb
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
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm text-gray-900"
                        >dative + <strong>
                        vermek</strong></span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      to give
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm text-gray-900"
                        >dative + <strong>
                        getirmek</strong></span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >to bring to 
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm text-gray-900"
                        >dative + <strong>
                        dönmek</strong></span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                     to turn to 
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm text-gray-900"
                        >dative + <strong>
                        atmak</strong></span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                     to throw to 
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm text-gray-900"
                        >dative + <strong>
                        demek</strong></span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                     to say to  
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm text-gray-900"
                        >dative + <strong>
                        inanmak</strong></span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                     to believe in
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm text-gray-900"
                        >dative + <strong>
                        oturmak</strong></span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                     to sit on 
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm text-gray-900"
                        >dative + <strong>
                        yürümek</strong></span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                     to walk to 
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm text-gray-900"
                        >dative + <strong>
                        sormak</strong></span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                     to ask to 
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm text-gray-900"
                        >dative + <strong>
                        binmek</strong></span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                     to get on (a vehicule)
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm text-gray-900"
                        >dative + <strong>
                        bakmak</strong></span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                     to look at 
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm text-gray-900"
                        >dative + <strong>
                        girmek</strong></span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                     to enter 
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <br/>
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
        <h3 class="font-semibold text-gray-900 mb-2">
          Sentences
        </h3>
        <ul class="space-y-1 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <span
              class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              <span class=""
                >Kız otobüs<strong class="text-success"
                  >e </strong
                >biniyor <em>(the girl get on the bus)</em>
              </span>
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span
              class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              <span class=""
                >Çocuklar okul<strong class="text-success"
                  >a  </strong
                >giriyorlar <em>(the children enter school)</em>
              </span>
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span
              class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              <span class=""
                >Masa<strong class="text-success"
                  >ya </strong
                >bilgisayarımı koy <em>(Put my computer on the table)</em>
              </span>
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span
              class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              <span class=""
                >Mehmet arkadaşın<strong class="text-success"
                  >a  </strong
                >top attı <em>(Mehmet throwed the ball to his friend)</em>
              </span>
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span
              class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              <span class=""
                >Çiçeği Ayşe<strong class="text-success"
                  >'ye  </strong
                >veriyor. <em>(I am giving a flower to Ayşe)</em>
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <br/>
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
        Exceptions
      </h2>
    </div>
    <div class="space-y-4">
      <!-- Proper Names -->
      <div class="mt-2 border-l-4 border-amber-200 pl-4">
        <h3 class="font-semibold text-gray-900 ">
          Nouns ending in ç / k / p / t
        </h3>
        <p class="text-gray-900 mb-2">
          Some of these words have their last letters being replaced by <strong class="text-amber-600">c / ğ / b / d</strong> but not all of them
        </p>
        <ul class="space-y-1 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <span
              class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              <span class=""
                >Önce tuvalete bakın sonra yeme<strong class="text-amber-600">ğ</strong>e oturun → <em>First take a look at the bathrooms, then sit down to your meal. </em></span
              >
            </span>
          </li>
        </ul>
      </div>
      <div class="mt-2 border-l-4 border-amber-200 pl-4">
        <h3 class="font-semibold text-gray-900 ">
          Nouns with vowels disappearing
        </h3>
        <p class="text-gray-900 mb-2">
          A small number of words lose their last vowels when adding the dative suffix <br/>
        </p>
        <ul class="space-y-1 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <span
              class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              <span class=""
                >şehir <em>(city)</em> → Can <strong class="text-amber-600">şehre</strong> alışıyor <em>(Can is getting used to the city)</em></span
              >
            </span>
          </li>
        </ul>
      </div>
      <div class="mt-2 border-l-4 border-amber-200 pl-4">
        <h3 class="font-semibold text-gray-900 ">
          Some nouns break the vowel harmony
        </h3>
        <p class="text-gray-900 mb-2">
          Some words imported from abroad do not follow the vowel harmony <br/>
        </p>
        <ul class="space-y-1 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <span
              class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              <span class=""
                >saat <em>(time, watch)</em> →   <strong class="text-amber-600">Saate</strong> bak ! <em>(Look at the time!)</em></span
              >
            </span>
          </li>
        </ul>
      </div>
      <div class="mt-2 border-l-4 border-amber-200 pl-4">
        <h3 class="font-semibold text-gray-900 ">
          Nouns ending in <strong class="text-amber-600">-nk</strong>
        </h3>
        <p class="text-gray-900 mb-2">
          For these words, -nk becomes <strong class="text-amber-600">-ng</strong> <br/>
        </p>
        <ul class="space-y-1 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <span
              class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              <span class=""
                >renk <em>(color)</em> → Duvarın <strong class="text-amber-600">rengine</strong> uygun perde aldım <em>(I bought a curtain suitable for the wall's color)</em></span
              >
            </span>
          </li>
        </ul>
      </div>
      <div class="mt-2 border-l-4 border-amber-200 pl-4">
        <h3 class="font-semibold text-gray-900 ">
          Some words <strong class="text-amber-600">repeat their last consonnant</strong> before the dative suffix.
        </h3>

        <ul class="space-y-1 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <span
              class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              <span class=""
                >hak <em>(right)</em> →  Adalet için <strong class="text-amber-600">hakka</strong> saygı duymalıyız<em>(We must respect the right)</em></span
              >
            </span>
          </li>
        </ul>
      </div>
    </div>
    <br/>
    <h2 class="text-lg font-semibold text-gray-900">
        How To Use Dative With Pronouns ?
      </h2>
      <p class="m-3 font-semibold">
        For personal and demonstrative pronouns, it's not as simple as adding an a/e. <br/>
        For some of them, you'll need to change the "e" into an "a", or to add an "n"
      </p>

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
                  Pronoun
                </th>
                <th
                  class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                >
                  Dative Form
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
                    <strong class="text-primary">bana</strong>
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
                  <strong class="text-primary">sana</strong>
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
                    ><strong class="text-primary">ona</strong>
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
                    ><strong class="text-primary">bize</strong>
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
                    ><strong class="text-primary">size</strong>
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
                    ><strong class="text-primary">onlara</strong>
                  </span>
                </td>
              </tr>
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
                    ><strong class="text-primary">buna</strong>
                  </span>
                </td>
              </tr>
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4 text-center">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                    <span class="text-sm font-semibold text-gray-900"
                      >Şu</span
                    >
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span
                    class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    ><strong class="text-primary">şuna</strong>
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
                    ><strong class="text-primary">ona</strong>
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
                    ><strong class="text-primary">bunlara</strong>
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
                    ><strong class="text-primary">şunlara</strong>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
    <div>
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
                ><strong class="text-success"
                  >Bana </strong
                >bak ! <em>(look at me !)</em>
              </span>
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span
              class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              <span class=""
                >Hediyeyi <strong class="text-success"
                  >ona </strong
                >vereceğim  <em>(I'll give the present to him)</em>
              </span>
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span
              class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              <span class=""
                ><strong class="text-success"
                  >Şunlara  </strong
                >bak ya, çok tatlılar <em>(look at them, they are so cute)</em>
              </span>
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span
              class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              <span class=""
                ><strong class="text-success"
                  >Bize </strong
                >güven <em>(trust us)</em>
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <br>
    <h2 class="text-lg font-semibold text-gray-900 pb-2">
        How To Use Dative For Places ?
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
                  Pronoun
                </th>
                <th
                  class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                >
                  Dative Form
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
                      >Ne</span
                    >
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span
                    class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                  >
                    nereye
                  </span>
                </td>
                <td class="px-6 py-4 text-center">
                  <span
                    class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                  >
                    to where
                  </span>
                </td>
              </tr>
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4">
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
                  >
                    buraya
                  </span>
                </td>
                <td class="px-6 py-4 text-center">
                  <span
                    class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                  >
                    to here
                  </span>
                </td>
              </tr>
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4 text-center">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                    <span class="text-sm font-semibold text-gray-900"
                      >Şu</span
                    >
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span
                    class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >şuraya
                  </span>
                </td>
                <td class="px-6 py-4 text-center">
                  <span
                    class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >to here/there
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
                    >oraya
                  </span>
                </td>
                <td class="px-6 py-4 text-center">
                  <span
                    class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >to over there
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
    <div>
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
                ><strong class="text-success"
                  >Buraya </strong
                >gel ! <em>(come (to) here !)</em>
              </span>
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span
              class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              <span class=""
                ><strong class="text-success"
                  >Nereye </strong
                >gidiyorsun? ! <em>(where are you going?)</em>
              </span>
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span
              class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
            ></span>
            <span>
              <span class=""
                >Çantayı <strong class="text-success"
                  >şuraya   </strong
                >koydum <em>(I put the bag over there)</em>
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>
