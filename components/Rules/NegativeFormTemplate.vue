<template>
  <div class="max-w-4xl mx-auto p-6">
    <!-- Header -->
    <div class="border border-primary bg-primary text-white rounded-lg p-4">
      <div class="flex items-start gap-3">
        <div class="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
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
            One letter simply added in the middle of a verb can <span class="underline">totally</span> change the meaning of the sentence. <br/>
            Let's see how to negate verbs in Turkish starting with the present continuous tense.
          </p>
        </div>
      </div>
    </div>
    <br/>
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
        <h2 class="text-lg font-semibold text-gray-900">Present Continuous: How to Form the Negative</h2>
      </div>

      <p class="text-gray-700 mb-3">
        One of the first and most useful grammar structures you'll learn in Turkish is how to make verbs negative. 
        This can often be done by adding just one simple letter "<strong class="text-primary">m</strong>" which completely reverses the meaning of a sentence.
      </p>
      
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
          <span>
            <strong class="mr-2">Grammar Structure:</strong> Verb stem + <code class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm">m</code> + i/ı/u/ü + <code class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm">yor</code> + personal ending
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
          <span>
            <strong class="mr-2">Key Rule:</strong> Insert <code class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm">m</code> right before the <code class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm">-ıyor</code> ending
          </span>
        </li>
      </ul>
    </div>
    <br/>
    <!-- Table Template -->
    <div class="mt-6">
      <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <th class="px-6 py-4 text-left text-sm font-bold text-gray-700 tracking-wide">
                  Dictionary Form (Infinitive)
                </th>
                <th class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide">
                  Positive (3rd Person)
                </th>
                <th class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide">
                  Negative (3rd Person)
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900">Yapmak (to do)</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-semibold px-3 py-1 rounded-lg text-gray-700">Yapıyor</span>
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-semibold px-3 py-1 rounded-lg text-gray-700">Yapmıyor</span>
                </td>
              </tr>
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900">Oturmak (to sit)</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-semibold px-3 py-1 rounded-lg text-gray-700">Oturuyor</span>
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-semibold px-3 py-1 rounded-lg text-gray-700">Oturmuyor</span>
                </td>
              </tr>
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900">Koşmak (to run)</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-semibold px-3 py-1 rounded-lg text-gray-700">Koşuyor</span>
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-semibold px-3 py-1 rounded-lg text-gray-700">Koşmuyor</span>
                </td>
              </tr>
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900">Gelmek (to come)</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-semibold px-3 py-1 rounded-lg text-gray-700">Geliyor</span>
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="font-semibold px-3 py-1 rounded-lg text-gray-700">Gelmiyor</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <br/>
    <!-- Info gray section -->
    <div class="bg-gray-50 rounded-lg p-5 border border-gray-200 mt-6">
      <h2 class="text-lg font-semibold text-gray-900 mb-3">
        Good News: You Don't Need to Modify the Verb Stem
      </h2>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
          <span>
            <span class="font-medium">In Turkish, verb stems sometimes change slightly in the present continuous tense</span>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
          <span>
            <span class="font-medium">When forming the negative, you simply use the original stem as it appears in the dictionary</span>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
          <span>
            <span class="font-medium">This makes negatives easier to form than you might expect!</span>
          </span>
        </li>
      </ul>
    </div>
    <br/>
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
          Forming Negative Questions
        </h2>
      </div>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
          <span>
            Grammar Structure: Verb stem + <code class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm">m</code> + i/ı/u/ü + <code class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm">yor</code> + <code class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm">mu</code> + personal ending
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
          <span>
            Compare: <code class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm">Geliyor musun?</code> – "Are you coming?" vs <code class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm">Gelmiyor musun?</code> – "Aren't you coming?"
          </span>
        </li>
      </ul>
    </div>
    <br/>
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
        <h2 class="text-lg font-semibold text-gray-900">Real-Life Examples</h2>
      </div>

      <div class="space-y-4">
        <div class="border-l-4 border-success pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">Question Examples</h3>
          <p class="text-gray-700 text-sm mb-2">
            Negative questions often add emphasis, surprise, or even disapproval
          </p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"></span>
              <span>
                <span class="">Biliyor musunuz?</span> <em>(Do you know?)</em> → <strong class="text-success">Gerçekten bilmiyor musunuz?</strong> <em>(Do you really not know?!)</em>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <br/>
    <!-- Primary important section with steps -->
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
        <h2 class="text-lg font-semibold text-gray-900">Negative Form with Other Verb Endings</h2>
      </div>

      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
          <span>
            <strong>Outside of present continuous:</strong> The negative suffix retains its full form: <code class="bg-white px-2 py-1 rounded border text-sm">-ma</code> or <code class="bg-white px-2 py-1 rounded border text-sm">-me</code> (following vowel harmony)
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
          <span>
            <strong>Grammar Structure:</strong> Verb stem + <code class="bg-white px-2 py-1 rounded border text-sm">ma/me</code> + <code class="bg-white px-2 py-1 rounded border text-sm">mak/mek</code> (Used for negative infinitives)
          </span>
        </li>
      </ul>
    </div>
    <br/>
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
        <h2 class="text-lg font-semibold text-gray-900">Negative Infinitive Examples</h2>
      </div>
      <p class="font-semibold text-gray-700 mb-3">
        As you progress, you'll see this structure applied to many other tenses and moods
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">Yapmak (to do)</h3>
          <p class="font-medium text-gray-900 mb-2">Negative Infinitive</p>
          <div class="text-gray-700">
            <span class="font-medium">Yapmak</span> → <strong class="text-primary">Yapmamak</strong> <em>(to not do)</em>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">Gelmek (to come)</h3>
          <p class="font-medium text-gray-900 mb-2">Negative Infinitive</p>
          <div class="text-gray-700">
            <span class="font-medium">Gelmek</span> → <strong class="text-primary">Gelmemek</strong> <em>(to not come)</em>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">Anlamak (to understand)</h3>
          <p class="font-medium text-gray-900 mb-2">Negative Infinitive</p>
          <div class="text-gray-700">
            <span class="font-medium">Anlamak</span> → <strong class="text-primary">Anlamamak</strong> <em>(to not understand)</em>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">Oturmak (to sit)</h3>
          <p class="font-medium text-gray-900 mb-2">Negative Infinitive</p>
          <div class="text-gray-700">
            <span class="font-medium">Oturmak</span> → <strong class="text-primary">Oturmamak</strong> <em>(to not sit)</em>
          </div>
        </div>
      </div>
    </div>
    <br/>
    <!-- Exceptions template examples -->
    <div class="mt-6">
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
          Pronunciation Tip
        </h2>
      </div>
      <p class="mt-2 mb-3 font-semibold">Mastering this subtle distinction will make your spoken Turkish sound natural and fluent</p>
      <div class="space-y-4">
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">
            Stress Pattern Changes
          </h3>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>
                <span class="">In positive verbs:</span> stress falls on the <strong class="text-amber-600">-yor</strong> syllable
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
              <span>
                <span class="">In negative verbs:</span> stress shifts to the syllable immediately before the <strong class="text-amber-600">m</strong>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic can be added here if needed
</script>
