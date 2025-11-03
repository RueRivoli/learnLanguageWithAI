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
            In Turkish, the way we express sentences such as:
          </p>

          <ul
            class="text-white/90 leading-relaxed font-semibold mt-2 ml-4 list-disc list-inside"
          >
            <li>I am an engineer</li>
            <li>You aren't smart</li>
            <li>Is he tall?</li>
          </ul>

          <p class="text-white/90 leading-relaxed font-semibold">
            <span class="underline">
              differs significantly from how they're formed in English.
            </span>
          </p>
        </div>
      </div>
    </div>
    <br />
    <!-- Basic Structure -->
    <div class="bg-gray-50 rounded-lg p-5 border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900 mb-3">Basic Structure</h2>
      <p class="text-gray-700 mb-3">
        No need to worry — it's quite straightforward. In Turkish, forming this
        structure simply requires a personal pronoun, a noun (or an adjective),
        and the appropriate personal suffix.
      </p>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <span class="font-medium">Sen öğretmen<strong>sin</strong></span> -
            <em>you are a teacher</em>. "Sen" is the personal pronoun,
            "öğretmen" is the noun and "-sin" the personal suffix.
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            <span class="font-medium">Ben mutlu<strong>yum</strong></span> -
            <em>I am happy</em>. "-yum" is the personal suffix.
          </span>
        </li>
      </ul>
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

        <h2 class="text-lg font-semibold text-gray-900">
          Four Essential Forms
        </h2>
      </div>
      <p class="font-semibold text-gray-700 mb-3">
        There are four essential forms to consider when building these types of
        sentences: positive statements, negative statements, positive questions,
        and negative questions:
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">Positive Statement</h3>
          <p class="font-medium text-gray-900 mb-2">
            Personal pron. + noun/adj + personal suffix
          </p>
          <div class="text-gray-700">
            <span class="font-medium">Sen öğretmen<strong>sin</strong></span> -
            <em>you are a teacher</em>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">Negative Statement</h3>
          <p class="font-medium text-gray-900 mb-2">
            Personal pron. + noun/adj + değil + personal suffix
          </p>
          <div class="text-gray-700">
            <span class="font-medium">Ben tembel değil<strong>im</strong></span>
            - <em>I am not lazy</em>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">Positive Question</h3>
          <p class="font-medium text-gray-900 mb-2">
            Personal pron. + noun/adj + mi* + personal suffix
          </p>
          <div class="text-gray-700">
            <span class="font-medium">Siz hızlı mı<strong>sınız</strong>?</span>
            - <em>Are you fast?</em>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">Negative Question</h3>
          <p class="font-medium text-gray-900 mb-2">
            Personal pron. + noun/adj + değil + mi* + personal suffix
          </p>
          <div class="text-gray-700">
            <span class="font-medium"
              >Yabancı değil mı<strong>sın</strong>?</span
            >
            - <em>Are you not a stranger?</em>
          </div>
        </div>
      </div>
      <p class="mt-2 font-semibold text-gray-700">
        * mi = mi | mı | mü | mu is the interrogative particle following the
        vowel harmony
      </p>
    </div>
    <br />
    <!-- Personal Suffixes -->
    <div>
      <h2 class="text-lg font-semibold text-gray-900 mb-1">
        Personal Suffixes
      </h2>
      <p class="mb-3 text-gray-700">
        We add personal suffixes following the vowel harmony:
      </p>
      <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div class="text-center">
            <div class="font-medium text-gray-900">Ben</div>
            <div class="text-sm text-gray-600">I</div>
            <div class="font-medium text-primary">-im/-ım/-um/-üm</div>
          </div>
          <div class="text-center">
            <div class="font-medium text-gray-900">Sen</div>
            <div class="text-sm text-gray-600">You (singular)</div>
            <div class="font-medium text-primary">-sin/-sın/-sun/-sün</div>
          </div>
          <div class="text-center">
            <div class="font-medium text-gray-900">O</div>
            <div class="text-sm text-gray-600">He/She/It</div>
            <div class="font-medium text-primary">(no suffix)</div>
          </div>
          <div class="text-center">
            <div class="font-medium text-gray-900">Biz</div>
            <div class="text-sm text-gray-600">We</div>
            <div class="font-medium text-primary">-iz/-ız/-uz/-üz</div>
          </div>
          <div class="text-center">
            <div class="font-medium text-gray-900">Siz</div>
            <div class="text-sm text-gray-600">You (plural)</div>
            <div class="font-medium text-primary">
              -siniz/-sınız/-sunuz/-sünüz
            </div>
          </div>
          <div class="text-center">
            <div class="font-medium text-gray-900">Onlar</div>
            <div class="text-sm text-gray-600">They</div>
            <div class="font-medium text-primary">-ler/-lar</div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div>
      <h2 class="text-lg font-semibold text-gray-900 mb-3">
        Positive statement
      </h2>
      <div id="table_positive">
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
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900">O</span>
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
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
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
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
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
        <br />
        <div id="table_positive_example">
          <div
            class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
          >
            <table class="w-full">
              <thead>
                <tr
                  class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200"
                >
                  <th
                    class="px-6 py-4 text-left text-sm font-bold text-gray-700 tracking-wide"
                  >
                    öğretmen
                  </th>
                  <th
                    class="px-6 py-4 text-left font-medium text-sm text-gray-700 tracking-wide"
                  >
                    teacher
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Ben öğretmenim</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-lg text-gray-700">
                      I am a teacher
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Sen öğretmensin</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-lg text-gray-700">
                      You are a teacher
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >O öğretmen</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-lg text-gray-700">
                      He/she is a teacher
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Biz öğretmeniz</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-lg text-gray-700">
                      We are a teacher
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Siz öğretmensiniz</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-lg text-gray-700">
                      You are teachers
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Onlar öğretmenler</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-lg text-gray-700">
                      There are teachers
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
      <h2 class="text-lg font-semibold text-gray-900 mb-3">
        Negative statement
      </h2>
      <div id="table_positive">
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
                    For all verbs
                  </th>
                  <th
                    class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                  ></th>
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
                  <td class="px-6 py-4 text-left">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      -değilim
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-left">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Sen</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-left">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      -değilsin
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-left">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900">O</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-left">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >-değil</span
                    >
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-left">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="font-semibold rounded-lg text-gray-700"
                        >Biz</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-left">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      -değiliz
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Siz</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-left">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      -değilsiniz
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
                  <td class="px-6 py-4 text-left">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      -değiller
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <div id="table_negative_example">
          <div
            class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
          >
            <table class="w-full">
              <thead>
                <tr
                  class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200"
                >
                  <th
                    class="px-6 py-4 text-left text-sm font-bold text-gray-700 tracking-wide"
                  >
                    güzel
                  </th>
                  <th
                    class="font-medium px-6 py-4 text-left text-sm text-gray-700 tracking-wide"
                  >
                    beautiful
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Ben güzel değilim</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-lg text-gray-700">
                      I am not beautiful
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Sen güzel değilsin</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-lg text-gray-700">
                      You are not beautiful
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >O güzel değil</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-lg text-gray-700">
                      He/she is not beautiful
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Biz güzel değiliz</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-lg text-gray-700">
                      We are not beautiful
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Siz güzel değilsiniz</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-lg text-gray-700">
                      You are not beautiful (plural)
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >Onlar güzel değiller</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-lg text-gray-700">
                      There are not beautiful
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <br />
            <h2 class="text-lg font-semibold text-gray-900 mb-3">
              Positive question
            </h2>
            <div id="table_positive">
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
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
                        <td class="px-6 py-4">
                          <div class="flex items-center">
                            <div
                              class="w-2 h-2 bg-primary rounded-full mr-3"
                            ></div>
                            <span class="text-sm font-semibold text-gray-900"
                              >Ben</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            mıyım
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            miyim
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            muyum
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            müyüm
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
                            <span class="text-sm font-semibold text-gray-900"
                              >Sen</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            mısın
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            misin
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            musun
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            müsün
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
                            <span class="text-sm font-semibold text-gray-900"
                              >O</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                            >mı</span
                          >
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                            >mi
                          </span>
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
                            >mü</span
                          >
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
                            <span class="font-semibold rounded-lg text-gray-700"
                              >Biz</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            mıyız
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            miyiz
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            muyuz
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            müyüz
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
                            <span class="text-sm font-semibold text-gray-900"
                              >Siz</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            mısınız
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            misiniz
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            musunuz
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            müsünüz
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
                            <span class="text-sm font-semibold text-gray-900"
                              >Onlar</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            mı
                          </span>
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
                            mu
                          </span>
                        </td>
                        <td class="px-6 py-4 text-center">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            mü
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <br />
              <div id="table_positive_example">
                <div
                  class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                >
                  <table class="w-full">
                    <thead>
                      <tr
                        class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200"
                      >
                        <th
                          class="px-6 py-4 text-left text-sm font-bold text-gray-700 tracking-wide"
                        >
                          aktör
                        </th>
                        <th
                          class="px-6 py-4 text-left font-medium text-sm text-gray-700 tracking-wide"
                        >
                          actor
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
                            <span class="text-sm font-semibold text-gray-900"
                              >Ben aktör müyüm?</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-3 py-1 rounded-lg text-gray-700">
                            Am I an actor ?
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
                        <td class="px-6 py-4">
                          <div class="flex items-center">
                            <div
                              class="w-2 h-2 bg-primary rounded-full mr-3"
                            ></div>
                            <span class="text-sm font-semibold text-gray-900"
                              >Sen aktör müsün?</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-3 py-1 rounded-lg text-gray-700">
                            Are you an actor ?
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
                        <td class="px-6 py-4">
                          <div class="flex items-center">
                            <div
                              class="w-2 h-2 bg-primary rounded-full mr-3"
                            ></div>
                            <span class="text-sm font-semibold text-gray-900"
                              >O aktör mü?</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-3 py-1 rounded-lg text-gray-700">
                            Is he/she an actor ?
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
                        <td class="px-6 py-4">
                          <div class="flex items-center">
                            <div
                              class="w-2 h-2 bg-primary rounded-full mr-3"
                            ></div>
                            <span class="text-sm font-semibold text-gray-900"
                              >Biz aktör müyüz?</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-3 py-1 rounded-lg text-gray-700">
                            Are we actors ?
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
                        <td class="px-6 py-4">
                          <div class="flex items-center">
                            <div
                              class="w-2 h-2 bg-primary rounded-full mr-3"
                            ></div>
                            <span class="text-sm font-semibold text-gray-900"
                              >Siz aktör müsünüz?</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-3 py-1 rounded-lg text-gray-700">
                            Are you actors ? - Are you an actor ? (plural)
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
                        <td class="px-6 py-4">
                          <div class="flex items-center">
                            <div
                              class="w-2 h-2 bg-primary rounded-full mr-3"
                            ></div>
                            <span class="text-sm font-semibold text-gray-900"
                              >Onlar aktör mü?</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-3 py-1 rounded-lg text-gray-700">
                            Are they actors ?
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <br />
              <div id="table_positive_example">
                <div
                  class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                >
                  <table class="w-full">
                    <thead>
                      <tr
                        class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200"
                      >
                        <th
                          class="px-6 py-4 text-left text-sm font-bold text-gray-700 tracking-wide"
                        >
                          akıllı
                        </th>
                        <th
                          class="px-6 py-4 text-left font-medium text-sm text-gray-700 tracking-wide"
                        >
                          smart
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
                            <span class="text-sm font-semibold text-gray-900"
                              >Ben akıllı mıyım?</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-3 py-1 rounded-lg text-gray-700">
                            Am I smart ?
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
                        <td class="px-6 py-4">
                          <div class="flex items-center">
                            <div
                              class="w-2 h-2 bg-primary rounded-full mr-3"
                            ></div>
                            <span class="text-sm font-semibold text-gray-900"
                              >Sen akıllı mısın?</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-3 py-1 rounded-lg text-gray-700">
                            Are you smart ?
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
                        <td class="px-6 py-4">
                          <div class="flex items-center">
                            <div
                              class="w-2 h-2 bg-primary rounded-full mr-3"
                            ></div>
                            <span class="text-sm font-semibold text-gray-900"
                              >O akıllı mı?</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-3 py-1 rounded-lg text-gray-700">
                            Is he/she smart ?
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
                        <td class="px-6 py-4">
                          <div class="flex items-center">
                            <div
                              class="w-2 h-2 bg-primary rounded-full mr-3"
                            ></div>
                            <span class="text-sm font-semibold text-gray-900"
                              >Biz akıllı mıyız?</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-3 py-1 rounded-lg text-gray-700">
                            Are we smart ?
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
                        <td class="px-6 py-4">
                          <div class="flex items-center">
                            <div
                              class="w-2 h-2 bg-primary rounded-full mr-3"
                            ></div>
                            <span class="text-sm font-semibold text-gray-900"
                              >Siz akıllı mısınız?</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-3 py-1 rounded-lg text-gray-700">
                            Are you smart ? (plural)
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
                        <td class="px-6 py-4">
                          <div class="flex items-center">
                            <div
                              class="w-2 h-2 bg-primary rounded-full mr-3"
                            ></div>
                            <span class="text-sm font-semibold text-gray-900"
                              >Onlar akıllı mı?</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-3 py-1 rounded-lg text-gray-700">
                            Are they smart ?
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
            <h2 class="text-lg font-semibold text-gray-900 mb-3">
              Negative question
            </h2>
            <div id="table_positive">
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
                          For all verbs
                        </th>
                        <th
                          class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                        ></th>
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
                            <span class="text-sm font-semibold text-gray-900"
                              >Ben</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4 text-left">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            değil miyim
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
                            <span class="text-sm font-semibold text-gray-900"
                              >Sen</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4 text-left">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            değil misin
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
                            <span class="text-sm font-semibold text-gray-900"
                              >O</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4 text-left">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            değil mi</span
                          >
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
                            <span class="font-semibold rounded-lg text-gray-700"
                              >Biz</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4 text-left">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            değil miyiz
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
                            <span class="text-sm font-semibold text-gray-900"
                              >Siz</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4 text-left">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            değil misiniz
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
                            <span class="text-sm font-semibold text-gray-900"
                              >Onlar</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4 text-left">
                          <span
                            class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                          >
                            değiller mi
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <br />
              <div id="table_negative_question_example">
                <div
                  class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                >
                  <table class="w-full">
                    <thead>
                      <tr
                        class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200"
                      >
                        <th
                          class="px-6 py-4 text-left text-sm font-bold text-gray-700 tracking-wide"
                        >
                          hızlı
                        </th>
                        <th
                          class="font-medium px-6 py-4 text-left text-sm text-gray-700 tracking-wide"
                        >
                          fast
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
                            <span class="text-sm font-semibold text-gray-900"
                              >Ben hızlı değil miyim?</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-3 py-1 rounded-lg text-gray-700">
                            Am I not fast ?
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
                        <td class="px-6 py-4">
                          <div class="flex items-center">
                            <div
                              class="w-2 h-2 bg-primary rounded-full mr-3"
                            ></div>
                            <span class="text-sm font-semibold text-gray-900"
                              >Sen hızlı değil misin?</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-3 py-1 rounded-lg text-gray-700">
                            Are you not fast ?
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
                        <td class="px-6 py-4">
                          <div class="flex items-center">
                            <div
                              class="w-2 h-2 bg-primary rounded-full mr-3"
                            ></div>
                            <span class="text-sm font-semibold text-gray-900"
                              >O hızlı değil mi?</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-3 py-1 rounded-lg text-gray-700">
                            Is he/she not fast ?
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
                        <td class="px-6 py-4">
                          <div class="flex items-center">
                            <div
                              class="w-2 h-2 bg-primary rounded-full mr-3"
                            ></div>
                            <span class="text-sm font-semibold text-gray-900"
                              >Biz hızlı değil miyiz?</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-3 py-1 rounded-lg text-gray-700">
                            Are we not fast ?
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
                        <td class="px-6 py-4">
                          <div class="flex items-center">
                            <div
                              class="w-2 h-2 bg-primary rounded-full mr-3"
                            ></div>
                            <span class="text-sm font-semibold text-gray-900"
                              >Siz hızlı değil misiniz?</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-3 py-1 rounded-lg text-gray-700">
                            Are you not fast ? (plural)
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
                        <td class="px-6 py-4">
                          <div class="flex items-center">
                            <div
                              class="w-2 h-2 bg-primary rounded-full mr-3"
                            ></div>
                            <span class="text-sm font-semibold text-gray-900"
                              >Onlar hızlı değiller mi?</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-3 py-1 rounded-lg text-gray-700">
                            Are they not fast ?
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <br />
              <div id="table_negative_question_example_2">
                <div
                  class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                >
                  <table class="w-full">
                    <thead>
                      <tr
                        class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200"
                      >
                        <th
                          class="px-6 py-4 text-left text-sm font-bold text-gray-700 tracking-wide"
                        >
                          mimar
                        </th>
                        <th
                          class="font-medium px-6 py-4 text-left text-sm text-gray-700 tracking-wide"
                        >
                          architect
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
                            <span class="text-sm font-semibold text-gray-900"
                              >Ben mimar değil miyim?</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-3 py-1 rounded-lg text-gray-700">
                            Am I not an architect ?
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
                        <td class="px-6 py-4">
                          <div class="flex items-center">
                            <div
                              class="w-2 h-2 bg-primary rounded-full mr-3"
                            ></div>
                            <span class="text-sm font-semibold text-gray-900"
                              >Sen mimar değil misin?</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-3 py-1 rounded-lg text-gray-700">
                            Are you not an architect ?
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
                        <td class="px-6 py-4">
                          <div class="flex items-center">
                            <div
                              class="w-2 h-2 bg-primary rounded-full mr-3"
                            ></div>
                            <span class="text-sm font-semibold text-gray-900"
                              >O mimar değil mi?</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-3 py-1 rounded-lg text-gray-700">
                            Is he/she not an architect ?
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
                        <td class="px-6 py-4">
                          <div class="flex items-center">
                            <div
                              class="w-2 h-2 bg-primary rounded-full mr-3"
                            ></div>
                            <span class="text-sm font-semibold text-gray-900"
                              >Biz mimar değil miyiz?</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-3 py-1 rounded-lg text-gray-700">
                            Are we not architects ?
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
                        <td class="px-6 py-4">
                          <div class="flex items-center">
                            <div
                              class="w-2 h-2 bg-primary rounded-full mr-3"
                            ></div>
                            <span class="text-sm font-semibold text-gray-900"
                              >Siz mimar değil misiniz?</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-3 py-1 rounded-lg text-gray-700">
                            Are you architects ? - Are you not an architect ?
                            (plural)
                          </span>
                        </td>
                      </tr>
                      <tr
                        class="hover:bg-primary/5 transition-colors duration-150"
                      >
                        <td class="px-6 py-4">
                          <div class="flex items-center">
                            <div
                              class="w-2 h-2 bg-primary rounded-full mr-3"
                            ></div>
                            <span class="text-sm font-semibold text-gray-900"
                              >Onlar mimar değiller mi?</span
                            >
                          </div>
                        </td>
                        <td class="px-6 py-4">
                          <span class="px-3 py-1 rounded-lg text-gray-700">
                            Are they not architects ?
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
        <div></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>
