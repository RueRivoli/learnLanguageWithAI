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
            Mastering Turkish suffixes like -ci, -cik, -li, and -lik is a key
            step toward building a rich and expressive vocabulary. <br />
            These suffixes help you 
            <span class="underline"
              >form professions, describe belongings, create diminutives, and express
              relationships between objects and places.</span
            ><br/>
            With just a few patterns, you’ll unlock dozens of new words—making
            your Turkish both more natural and more precise. Keep going—you’re
            building a strong foundation!
          </p>
        </div>
      </div>
    </div>
    <br />
    <!-- -li Suffix -->
    <!-- Demonstrative Pronouns -->
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
        <h2 class="text-lg font-semibold text-gray-900">CI Suffix</h2>
        <em class="ml-2 text-lg text-gray-900"> For Professions</em>
      </div>

      <ul class="space-y-1 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <div class="leading-relaxed text-gray-700">
            This suffix, which changes to
            <code class="border bg-white text-primary rounded p-1"
              >-ci / -cı / -cu / -cü</code
            >
            according to <strong class="text-primary">
              i-type vowel harmony
            </strong> is added to a noun to form a profession or occupational title
          </div>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <div class="leading-relaxed text-gray-700 mb-3">
            When the noun ends in a voiceless consonant such as
            <code class="border bg-white text-primary rounded p-1"
              >k / t / ç / p</code
            >
            <span class="mt-2 mb-2">
              the suffix -ci undergoes consonant harmony, and
              <code class="border bg-white text-primary rounded p-1">c</code>
              changes to
              <code class="border bg-white text-primary rounded p-1">ç</code>
            </span>
          </div>
        </li>
      </ul>

      <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-2 px-3 font-medium text-gray-900">
                  Noun
                </th>
                <th class="text-left py-2 px-3 font-medium text-gray-900">
                  Profession
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr>
                <td class="py-2 px-3">
                  <span class="font-medium">Porselen</span>
                  <span class="text-gray-600">(porcelain)</span>
                </td>
                <td class="py-2 px-3">
                  <span class="font-medium">Porselenci</span>
                  <span class="text-gray-600">(porcelain dealer)</span>
                </td>
              </tr>
              <tr>
                <td class="py-2 px-3">
                  <span class="font-medium">Çay</span>
                  <span class="text-gray-600">(tea)</span>
                </td>
                <td class="py-2 px-3">
                  <span class="font-medium">çaycı</span>
                  <span class="text-gray-600">(tea seller)</span>
                </td>
              </tr>
              <tr>
                <td class="py-2 px-3">
                  <span class="font-medium">Kapı</span>
                  <span class="text-gray-600">(door)</span>
                </td>
                <td class="py-2 px-3">
                  <span class="font-medium">kapıcı</span>
                  <span class="text-gray-600">(doorman)</span>
                </td>
              </tr>
              <tr>
                <td class="py-2 px-3">
                  <span class="font-medium">Yol</span>
                  <span class="text-gray-600">(road/way)</span>
                </td>
                <td class="py-2 px-3">
                  <span class="font-medium">yolcu</span>
                  <span class="text-gray-600">(traveler)</span>
                </td>
              </tr>
              <tr>
                <td class="py-2 px-3">
                  <span class="font-medium">Kömür</span>
                  <span class="text-gray-600">(coal)</span>
                </td>
                <td class="py-2 px-3">
                  <span class="font-medium">kömürcü</span>
                  <span class="text-gray-600">(charcoal burner, coaler)</span>
                </td>
              </tr>
              <tr>
                <td class="py-2 px-3">
                  <span class="font-medium">Balık</span>
                  <span class="text-gray-600">(fish)</span>
                </td>
                <td class="py-2 px-3">
                  <span class="font-medium">balıkçı</span>
                  <span class="text-gray-600">(fish monfer, fish seller)</span>
                </td>
              </tr>
            </tbody>
          </table>
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
        <h2 class="text-lg font-semibold text-gray-900">LI Suffix</h2>
        <em class="ml-2 text-lg text-gray-900"> For "With"</em>
      </div>

      <ul class="space-y-1 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <div class="text-gray-700">
            This suffix declined in
            <code class="border bg-white text-primary rounded p-1"
              >li / lı / lu / lü</code
            >
            according to the<strong class="text-primary">
              i-type vowel harmony </strong
            ><br />
            <div class="mt-1 mb-2">
              is added to a noun to create a substantive
            </div>
          </div>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span class="text-gray-700">
            It gives the meaning of
            <strong class="text-primary">
              equipped with, originally from
            </strong>
          </span>
        </li>
      </ul>
      <br />

      <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-2 px-3 font-medium text-gray-900">
                  Noun
                </th>
                <th class="text-left py-2 px-3 font-medium text-gray-900">
                  Substantive
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr>
                <td class="py-2 px-3">
                  <span class="font-medium">Ev</span>
                  <span class="text-gray-600">(huse)</span>
                </td>
                <td class="py-2 px-3">
                  <span class="font-medium">evli</span>
                  <span class="text-gray-600">(married)</span>
                </td>
              </tr>
              <tr>
                <tr>
                <td class="py-2 px-3">
                  <span class="font-medium">Gözlük</span>
                  <span class="text-gray-600">(glasses)</span>
                </td>
                <td class="py-2 px-3">
                  <span class="font-medium">gözlüklü</span>
                  <span class="text-gray-600">(with glasses)</span>
                </td>
              </tr>
              <tr>
                <td class="py-2 px-3">
                  <span class="font-medium">Hak</span>
                  <span class="text-gray-600">(right)</span>
                </td>
                <td class="py-2 px-3">
                  <span class="font-medium">haklı</span>
                  <span class="text-gray-600">(who is right)</span>
                </td>
              </tr>
              <tr>
                <td class="py-2 px-3">
                  <span class="font-medium">Süt</span>
                  <span class="text-gray-600">(milk)</span>
                </td>
                <td class="py-2 px-3">
                  <span class="font-medium">sütlü</span>
                  <span class="text-gray-600">(with milk)</span>
                </td>
              </tr>
              <tr>
                <td class="py-2 px-3">
                  <span class="font-medium">Güneş</span>
                  <span class="text-gray-600">(sun)</span>
                </td>
                <td class="py-2 px-3">
                  <span class="font-medium">güneşli</span>
                  <span class="text-gray-600">(sunny)</span>
                </td>
              </tr>
              <tr>
                <td class="py-2 px-3">
                  <span class="font-medium">Göz</span>
                  <span class="text-gray-600">(eye)</span>
                </td>
                <td class="py-2 px-3">
                  <span class="font-medium">mavi gözlü kız</span>
                  <span class="text-gray-600">(the girl with blue eyes)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <br />
    <!-- Siz suffix -->
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
        <h2 class="text-lg font-semibold text-gray-900">SIZ Suffix</h2>
        <em class="ml-2 text-lg text-gray-900"> For "Without"</em>
      </div>

      <ul class="space-y-1 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <div class="text-gray-700">
            This suffix declined in
            <code class="border bg-white text-primary rounded p-1"
              >siz / sız / suz / süz</code
            >
            according to the
            <strong class="text-primary"> i-type vowel harmony </strong><br />
            <div class="mt-1 mb-2">
              is added to a noun to create a substantive
            </div>
          </div>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span class="text-gray-700">
            It gives the idea of
            <strong class="text-primary">
              "deprivation, absence, lack of something"
            </strong>
            <span>
              The English equivalent is
              <strong class="text-primary"> without </strong>
            </span>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span class="text-gray-700">
            The English equivalent is
            <strong class="text-primary"> without </strong>
          </span>
        </li>
      </ul>
      <br />
      <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-2 px-3 font-medium text-gray-900">
                  Noun
                </th>
                <th class="text-left py-2 px-3 font-medium text-gray-900">
                  Substantive
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr>
                <td class="py-2 px-3">
                  <span class="font-medium">İş</span>
                  <span class="text-gray-600">(work)</span>
                </td>
                <td class="py-2 px-3">
                  <span class="font-medium">işsiz</span>
                  <span class="text-gray-600">(unemployed)</span>
                </td>
              </tr>
              <tr>
                <td class="py-2 px-3">
                  <span class="font-medium">Ev</span>
                  <span class="text-gray-600">(home)</span>
                </td>
                <td class="py-2 px-3">
                  <span class="font-medium">evsiz</span>
                  <span class="text-gray-600">(homeless)</span>
                </td>
              </tr>
              <tr>
                <td class="py-2 px-3">
                  <span class="font-medium">Şeker</span>
                  <span class="text-gray-600">(sugar)</span>
                </td>
                <td class="py-2 px-3">
                  <span class="font-medium">şekersiz</span>
                  <span class="text-gray-600">(without sugar)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <br />

    <!-- Siz suffix -->
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
        <h2 class="text-lg font-semibold text-gray-900">LIK Suffix</h2>
        <em class="ml-2 text-lg text-gray-900"> For Substantives</em>
      </div>

      <ul class="space-y-1 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <div class="text-gray-700">
            This suffix declined in
            <code class="border bg-white text-primary rounded p-1"
              >lik / lık / luk / lük</code
            >
            according to the
            <strong class="text-primary"> i-type vowel harmony </strong><br />
            <div class="mt-1 mb-2">
              is used to create substantives from nouns and adjectives
            </div>
          </div>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span class="text-gray-700">
            Some words made with -lik can also be used as adjectives
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span class="text-gray-700">
            It can also give the meaning
            <strong class="text-primary"> destinated to, for</strong>
          </span>
        </li>
      </ul>
      <br />
      <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-2 px-3 font-medium text-gray-900">
                  Noun
                </th>
                <th class="text-left py-2 px-3 font-medium text-gray-900">
                  Substantive
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr>
                <td class="py-2 px-3">
                  <span class="font-medium">Arkadaş</span>
                  <span class="text-gray-600">(friend)</span>
                </td>
                <td class="py-2 px-3">
                  <span class="font-medium">arkadaşlık</span>
                  <span class="text-gray-600">(friendship)</span>
                </td>
              </tr>
              <tr>
                <td class="py-2 px-3">
                  <span class="font-medium">Yolcu</span>
                  <span class="text-gray-600">(traveler)</span>
                </td>
                <td class="py-2 px-3">
                  <span class="font-medium">yolculuk</span>
                  <span class="text-gray-600">(travel)</span>
                </td>
              </tr>
              <tr>
                <td class="py-2 px-3">
                  <span class="font-medium">Tuz</span>
                  <span class="text-gray-600">(salt)</span>
                </td>
                <td class="py-2 px-3">
                  <span class="font-medium">tuzluk</span>
                  <span class="text-gray-600">(salt shaker)</span>
                </td>
              </tr>
            </tbody>
          </table>
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
        <h2 class="text-lg font-semibold text-gray-900">CIK Suffix</h2>
        <em class="ml-2 text-lg text-gray-900"> For Diminutives</em>
      </div>

      <ul class="space-y-1 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <div class="text-gray-700">
            This suffix declined in
            <code class="border bg-white text-primary rounded p-1"
              >cik / cık / cuk / cük</code
            >
            according to the
            <strong class="text-primary"> i-type vowel harmony </strong><br />
            <div class="mt-1 mb-2">
              is added to a noun to create a diminutive
            </div>
          </div>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span class="text-gray-700">
            It enables us to speak about someone or something with
            <strong class="text-primary">
              a tone of affection or familiarity</strong
            >
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span class="text-gray-700">
            When used with a possessive suffix, the suffix -cik comes first
          </span>
        </li>
      </ul>
      <br />
      <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="text-left py-2 px-3 font-medium text-gray-900">
                  Noun
                </th>
                <th class="text-left py-2 px-3 font-medium text-gray-900">
                  Diminutive
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr>
                <td class="py-2 px-3">
                  <span class="font-medium">Adam</span>
                  <span class="text-gray-600">(man)</span>
                </td>
                <td class="py-2 px-3">
                  <span class="font-medium">adamcık</span>
                  <span class="text-gray-600">(the little man)</span>
                </td>
              </tr>
              <tr>
                <td class="py-2 px-3">
                  <span class="font-medium">Ev</span>
                  <span class="text-gray-600">(house)</span>
                </td>
                <td class="py-2 px-3">
                  <span class="font-medium">evcik</span>
                  <span class="text-gray-600">(little house)</span>
                </td>
              </tr>
              <tr>
                <td class="py-2 px-3">
                  <span class="font-medium">Gül</span>
                  <span class="text-gray-600">(rose)</span>
                </td>
                <td class="py-2 px-3">
                  <span class="font-medium">gülcük</span>
                  <span class="text-gray-600">(little rose)</span>
                </td>
              </tr>
              <tr>
                <td class="py-2 px-3">
                  <span class="font-medium">anne</span>
                  <span class="text-gray-600">(mother)</span>
                </td>
                <td class="py-2 px-3">
                  <span class="font-medium">anneciğim</span>
                  <span class="text-gray-600">(my little mom)</span>
                </td>
              </tr>
              <tr>
                <td class="py-2 px-3">
                  <span class="font-medium">karı</span>
                  <span class="text-gray-600">(wife)</span>
                </td>
                <td class="py-2 px-3">
                  <span class="font-medium">karıcığim</span>
                  <span class="text-gray-600">(my little wife)</span>
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
