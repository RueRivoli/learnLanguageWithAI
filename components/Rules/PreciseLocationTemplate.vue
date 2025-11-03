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
            One of the most useful skills in any language is the ability to
            <span class="underline">describe where things are located.</span>
            In Turkish, location is described using a specific structure with
            possessive endings and location words.
          </p>
        </div>
      </div>
    </div>
    <br />

    <!-- Key Structure -->
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
            d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V21A2.25 2.25 0 0 1 8.25 21h-2.25A2.25 2.25 0 0 1 3.75 18.75v-3ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25A2.25 2.25 0 0 1 13.5 8.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
          />
        </svg>
        <h2 class="text-lg font-semibold text-gray-900">The Key Structure</h2>
      </div>
      <p class="text-gray-700 mb-4">
        In Turkish, location is usually described with this structure:
      </p>
      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <div class="text-center">
          <div class="text-lg font-bold text-primary mb-2">
            [Object/Person] + [Location Word] + [Possessive Ending] + [Verb "to
            be"]
          </div>
        </div>
      </div>
    </div>
    <br />

    <!-- Example Section -->
    <div class="bg-gray-50 rounded-lg p-5 border border-gray-200">
      <div class="flex items-center mb-4">
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
            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
          />
        </svg>
        <h2 class="text-lg font-semibold text-gray-900">Example Breakdown</h2>
      </div>

      <div class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <div class="text-center mb-4">
          <div class="text-2xl font-bold text-gray-900 mb-2">
            Kitap masanın üstünde.
          </div>
          <div class="text-gray-600">The book is on the table.</div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span
                class="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary"
                >1</span
              >
              <span class="font-medium">Kitap</span>
              <span class="text-gray-500">= book</span>
            </div>
            <div class="flex items-center gap-2">
              <span
                class="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary"
                >2</span
              >
              <span class="font-medium">masa</span>
              <span class="text-gray-500">= table</span>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span
                class="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary"
                >3</span
              >
              <span class="font-medium">-nın</span>
              <span class="text-gray-500">= possessive ending</span>
            </div>
            <div class="flex items-center gap-2">
              <span
                class="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary"
                >4</span
              >
              <span class="font-medium">üstünde</span>
              <span class="text-gray-500">= on it</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />

    <!-- Essential Location Words -->
    <div
      class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
    >
      <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 class="text-xl font-bold text-gray-900">
          Essential Location Words
        </h2>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
              >
                English
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
              >
                Turkish Word
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
              >
                Example Sentence
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
              >
                Translation
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr class="hover:bg-gray-50">
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                in front of
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <code
                  class="bg-primary/10 px-2 py-1 rounded text-primary text-sm"
                  >önünde</code
                >
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                Araba evin önünde.
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                The car is in front of the house.
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                behind
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <code
                  class="bg-primary/10 px-2 py-1 rounded text-primary text-sm"
                  >arkasında</code
                >
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                Bahçe evin arkasında.
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                The garden is behind the house.
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                next to/beside
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <code
                  class="bg-primary/10 px-2 py-1 rounded text-primary text-sm"
                  >yanında</code
                >
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                Çanta sandalyenin yanında.
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                The bag is next to the chair.
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                between
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <code
                  class="bg-primary/10 px-2 py-1 rounded text-primary text-sm"
                  >arasında</code
                >
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                Park okul ile hastanenin arasında.
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                The park is between the school and hospital.
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                on (top of)
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <code
                  class="bg-primary/10 px-2 py-1 rounded text-primary text-sm"
                  >üstünde</code
                >
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                Kitap masanın üstünde.
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                The book is on the table.
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                under/below
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <code
                  class="bg-primary/10 px-2 py-1 rounded text-primary text-sm"
                  >altında</code
                >
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                Kedi masanın altında.
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                The cat is under the table.
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                inside
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <code
                  class="bg-primary/10 px-2 py-1 rounded text-primary text-sm"
                  >içinde</code
                >
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                Kalem kutunun içinde.
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                The pen is inside the box.
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                outside
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <code
                  class="bg-primary/10 px-2 py-1 rounded text-primary text-sm"
                  >dışında</code
                >
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                Çocuklar evin dışında.
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                The children are outside the house.
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                around
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <code
                  class="bg-primary/10 px-2 py-1 rounded text-primary text-sm"
                  >etrafında</code
                >
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                Bankalar meydanın etrafında.
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                The banks are around the square.
              </td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                above (not touching)
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <code
                  class="bg-primary/10 px-2 py-1 rounded text-primary text-sm"
                  >üzerinde</code
                >
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                Lamba masanın üzerinde.
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                The lamp is above the table.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <br />

    <!-- Possessive Ending Explanation -->
    <div class="bg-primary/10 rounded-lg p-5 border border-gray-200">
      <div class="flex items-center mb-3">
        <h2 class="text-lg font-semibold text-gray-900">
          A Closer Look at Usage
        </h2>
      </div>

      <div class="bg-white rounded-lg p-4 border border-gray-200">
        <h3 class="font-semibold text-gray-900 mb-3">🔹 Possessive Ending</h3>
        <p class="text-gray-700 mb-3">
          Notice that the location word takes a possessive suffix to connect it
          to the object:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="font-medium">ev</span>
              <span class="text-gray-500">→ house</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium">evin önünde</span>
              <span class="text-gray-500">→ in front of the house</span>
            </div>
          </div>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="font-medium">masa</span>
              <span class="text-gray-500">→ table</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium">masanın altında</span>
              <span class="text-gray-500">→ under the table</span>
            </div>
          </div>
        </div>
        <p class="text-gray-700 mt-3">
          This is an important feature of Turkish: location is always relative
          to something.
        </p>
      </div>
    </div>
    <br />

    <!-- Practice Examples -->
    <div class="bg-gray-50 rounded-lg p-5 border border-gray-200">
      <div class="flex items-center mb-4">
        <h2 class="text-lg font-semibold text-gray-900">
          Practice with Examples
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div class="text-lg font-medium text-gray-900 mb-2">
            Telefon çantanın içinde.
          </div>
          <div class="text-gray-600">The phone is inside the bag.</div>
        </div>

        <div class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div class="text-lg font-medium text-gray-900 mb-2">
            Köpek kapının önünde.
          </div>
          <div class="text-gray-600">The dog is in front of the door.</div>
        </div>

        <div class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div class="text-lg font-medium text-gray-900 mb-2">
            Okul kütüphanenin yanında.
          </div>
          <div class="text-gray-600">The school is next to the library.</div>
        </div>

        <div class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div class="text-lg font-medium text-gray-900 mb-2">
            Anahtar arabanın içinde değil, masanın üstünde.
          </div>
          <div class="text-gray-600">
            The key is not inside the car, it's on the table.
          </div>
        </div>
      </div>
    </div>
    <br />

    <!-- Tips and Encouragement -->
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
            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z"
          />
        </svg>
        <h2 class="text-lg font-semibold text-gray-900">
          Encouragement & Tips
        </h2>
      </div>

      <div class="space-y-4">
        <div class="flex items-start gap-3">
          <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <strong class="text-gray-900">Visualize the space.</strong>
            <span class="text-gray-700"
              >When you learn each new word, imagine the scene. For example,
              picture a cat under a table or a lamp above it.</span
            >
          </div>
        </div>

        <div class="flex items-start gap-3">
          <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <strong class="text-gray-900"
              >Practice with your environment.</strong
            >
            <span class="text-gray-700"
              >Look around your room and describe objects in Turkish:
              "Bilgisayar masanın üstünde" (The computer is on the desk).</span
            >
          </div>
        </div>

        <div class="flex items-start gap-3">
          <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
          <div>
            <strong class="text-gray-900">Build gradually.</strong>
            <span class="text-gray-700"
              >Start with single sentences, then move to longer ones:</span
            >
            <div class="mt-2 space-y-1">
              <div class="text-gray-700">"Kedi masanın altında."</div>
              <div class="text-gray-700">
                "Kedi masanın altında ama köpek kapının önünde."
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg p-4 border border-gray-200 mt-4">
          <p class="text-gray-700 text-center font-medium">
            With consistent practice, you'll find yourself naturally describing
            locations in Turkish.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
