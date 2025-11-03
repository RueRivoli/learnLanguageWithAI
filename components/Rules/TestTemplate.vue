<template>
  <div class="max-w-4xl mx-auto p-6 space-y-6">
    <!-- Header -->
    <div class="border-b border-gray-200 pb-4">
      <div class="flex items-start gap-3">
        <div
          class="w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1"
        >
          <svg
            class="w-5 h-5 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46"
            />
          </svg>
        </div>
        <div>
          <p class="text-gray-700 leading-relaxed">
            Turkish expresses possession using consistent and logical suffixes
            applied to both the owner and the thing owned. Once you grasp the
            pattern, it becomes intuitive and reliable.
          </p>
        </div>
      </div>
    </div>

    <!-- Basic Rules -->
    <div class="bg-gray-50 rounded-lg p-5 border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900 mb-3">
        Basic Suffix Rules
      </h2>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          />
          <span>
            <strong>Owner suffix: </strong>
            <code class="bg-white px-2 py-1 rounded border text-sm"
              >-nın/nin/nun/nün</code
            >
            (or
            <code class="bg-white px-2 py-1 rounded border text-sm"
              >-ın/in/un/ün</code
            >
            if the word ends in a consonant)
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          />
          <span>
            <strong>Owned item suffix:</strong>
            <code class="bg-white px-2 py-1 rounded border text-sm"
              >-sı/si/su/sü</code
            >
            (or
            <code class="bg-white px-2 py-1 rounded border text-sm"
              >-ı/i/u/ü</code
            >
            if it ends in a consonant)
          </span>
        </li>
      </ul>
    </div>

    <!-- Examples -->
    <div>
      <h2 class="text-lg font-semibold text-gray-900 mb-3">Examples</h2>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"
          />
          <span>
            <span class=""
              >Annem<strong class="text-primary">in</strong> araba<strong
                class="text-primary"
                >sı</strong
              ></span
            >
            -
            <em>My mom's car</em>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"
          />
          <span>
            <span class=""
              >Öğretmen<strong class="text-primary">in</strong> masa<strong
                class="text-primary"
                >sı</strong
              ></span
            >
            -
            <em>The teacher's table</em>
          </span>
        </li>
      </ul>
    </div>

    <!-- Possessive Pronouns -->
    <div>
      <div class="flex items-center gap-2 mb-4">
        <div
          class="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center"
        >
          <svg
            class="w-4 h-4 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-gray-900">Possessive Pronouns</h2>
      </div>

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
                  class="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wide"
                >
                  Pronoun
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wide"
                >
                  Form
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wide"
                >
                  Example
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr class="hover:bg-blue-50/50 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900"
                      >Benim (my)</span
                    >
                  </div>
                </td>
                <td class="px-6 py-4">
                  <code
                    class="bg-gray-100 px-3 py-1 rounded-lg text-sm font-mono text-gray-700 border"
                  >
                    (noun + ı/i/u/ü + m)
                  </code>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm text-gray-700">
                    <span class="font-medium">Benim çayım</span> – My tea
                  </span>
                </td>
              </tr>
              <tr class="hover:bg-green-50/50 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900"
                      >Senin (your)</span
                    >
                  </div>
                </td>
                <td class="px-6 py-4">
                  <code
                    class="bg-gray-100 px-3 py-1 rounded-lg text-sm font-mono text-gray-700 border"
                  >
                    (noun + ı/i/u/ü + n)
                  </code>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm text-gray-700">
                    <span class="font-medium">Senin baban</span> – Your father
                  </span>
                </td>
              </tr>
              <tr class="hover:bg-purple-50/50 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900"
                      >Bizim (our)</span
                    >
                  </div>
                </td>
                <td class="px-6 py-4">
                  <code
                    class="bg-gray-100 px-3 py-1 rounded-lg text-sm font-mono text-gray-700 border"
                  >
                    (noun + ı/i/u/ü + mız/miz/muz/müz)
                  </code>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm text-gray-700">
                    <span class="font-medium">Bizim evimiz</span> – Our house
                  </span>
                </td>
              </tr>
              <tr class="hover:bg-orange-50/50 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900"
                      >Sizin (your - plural)</span
                    >
                  </div>
                </td>
                <td class="px-6 py-4">
                  <code
                    class="bg-gray-100 px-3 py-1 rounded-lg text-sm font-mono text-gray-700 border"
                  >
                    (noun + ı/i/u/ü + nız/niz/nuz/nüz)
                  </code>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm text-gray-700">
                    <span class="font-medium">Sizin kitabınız</span> – Your book
                  </span>
                </td>
              </tr>
              <tr class="hover:bg-red-50/50 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900"
                      >Onun (his/her/its)</span
                    >
                  </div>
                </td>
                <td class="px-6 py-4">
                  <code
                    class="bg-gray-100 px-3 py-1 rounded-lg text-sm font-mono text-gray-700 border"
                  >
                    (noun + s + ı/i/u/ü)
                  </code>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm text-gray-700">
                    <span class="font-medium">Onun kalemi</span> – His pen
                  </span>
                </td>
              </tr>
              <tr class="hover:bg-indigo-50/50 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                    <span class="text-sm font-semibold text-gray-900"
                      >Onların (their)</span
                    >
                  </div>
                </td>
                <td class="px-6 py-4">
                  <code
                    class="bg-gray-100 px-3 py-1 rounded-lg text-sm font-mono text-gray-700 border"
                  >
                    (noun + (s) + ı/i/u/ü or + lar/ler + ı/i/u/ü)
                  </code>
                </td>
                <td class="px-6 py-4">
                  <span class="text-sm text-gray-700">
                    <span class="font-medium">Onların arabaları</span> – Their
                    car(s)
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Additional Info -->
    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <p class="text-gray-700 text-sm">
        If you are using a pronoun such as
        <code class="bg-white px-1 rounded text-xs">sen</code> ("you") or
        <code class="bg-white px-1 rounded text-xs">ben</code> ("me") to talk
        about the owner of something, you still mark that pronoun with the
        "owner" ending <code class="bg-white px-1 rounded text-xs">‑nın</code>.
        But the first person pronouns "ben" and "biz" get a slightly different
        "owner" ending: <code class="bg-white px-1 rounded text-xs">‑im</code>.
      </p>
    </div>

    <!-- More Examples -->
    <div>
      <h2 class="text-lg font-semibold text-gray-900 mb-3">More Examples</h2>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"
          />
          <span>
            <span class=""
              >Benim anne<strong class="text-blue-600">m</strong> bir
              doktor.</span
            >
            -
            <em>My mother is a doctor.</em>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"
          />
          <span>
            <span class=""
              >Bu ben<strong class="text-blue-600">im</strong> oğlum.</span
            >
            -
            <em>This is my son.</em>
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"
          />
          <span>
            <span class=""
              >Pizza siz<strong class="text-blue-600">in</strong> mi?</span
            >
            -
            <em>Is the pizza yours?</em>
          </span>
        </li>
      </ul>
    </div>

    <!-- Special Cases -->
    <div>
      <div class="flex items-center gap-2 mb-3">
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
          Special Cases & Exceptions
        </h2>
      </div>

      <div class="space-y-4">
        <!-- Proper Names -->
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">Proper Names</h3>
          <p class="text-gray-700 text-sm mb-2">
            For proper names, add an apostrophe before the suffix:
          </p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              />
              <span>
                <span class=""
                  >Türkiye<strong class="text-amber-600">'nin</strong>
                  şehirler<strong class="text-amber-600">i</strong></span
                >
                -
                <em>Turkey's cities</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              />
              <span>
                <span class=""
                  >Can<strong class="text-amber-600">'ın</strong> kedi<strong
                    class="text-amber-600"
                    >si</strong
                  ></span
                >
                -
                <em>Can's cat</em>
              </span>
            </li>
          </ul>
        </div>

        <!-- Consonant Mutation -->
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">Consonant Mutation</h3>
          <p class="text-gray-700 text-sm mb-2">
            When (ç, k, p, t) is followed by a vowel:
          </p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              />
              <span
                ><code class="bg-gray-100 px-1 rounded text-xs">ç → c</code>
                (araç → ara<strong class="text-amber-600">c</strong>ım)</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              />
              <span
                ><code class="bg-gray-100 px-1 rounded text-xs">k → ğ</code>
                (yemek → yeme<strong class="text-amber-600">ğ</strong>in)</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              />
              <span
                ><code class="bg-gray-100 px-1 rounded text-xs">p → b</code>
                (kitap → kita<strong class="text-amber-600">b</strong>ı)</span
              >
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              />
              <span
                ><code class="bg-gray-100 px-1 rounded text-xs">t → d</code>
                (kağıt → kağı<strong class="text-amber-600">d</strong>ı)</span
              >
            </li>
          </ul>
        </div>

        <!-- Vowel Drop -->
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">Vowel Drop</h3>
          <p class="text-gray-700 text-sm mb-2">
            Some words drop the last vowel when adding a suffix:
          </p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              />
              <span><span class="px-1">izin → iznim</span></span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              />
              <span><span class="px-1">vakit → vaktin</span></span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              />
              <span><span class="px-1">şehir → şehrimiz</span></span>
            </li>
          </ul>
        </div>

        <!-- Bizim Exception -->
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">Bizim Exception</h3>
          <p class="text-gray-700 text-sm mb-2">
            With "bizim" the possessed noun often appears without a suffix:
          </p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              />
              <span
                ><span class="">Bizim mahalle</span> -
                <em>Our neighborhood</em></span
              >
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              />
              <span
                ><span class="">Bizim annem</span> - <em>Our mother</em></span
              >
            </li>
          </ul>
        </div>

        <!-- Consonant Duplication -->
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">
            Consonant Duplication
          </h3>
          <p class="text-gray-700 text-sm mb-2">
            Some words require consonant duplication before the suffix:
          </p>
          <ul class="space-y-1 text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              />
              <span
                ><span class="px-1">hat → hattım</span> - <em>my line</em></span
              >
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              />
              <span
                ><span class="px-1">hak → hakkın</span> -
                <em>your right</em></span
              >
            </li>
          </ul>
        </div>

        <!-- Vowel Duplication -->
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">Vowel Duplication</h3>
          <p class="text-gray-700 text-sm mb-2">
            Some words require vowel duplication:
          </p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              />
              <span
                ><span class="">Mahallenin camii</span> -
                <em>The mosque of the neighborhood</em></span
              >
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              />
              <span
                ><span class="">Kavganın mevzuu</span> -
                <em>The topic of the fight</em></span
              >
            </li>
          </ul>
        </div>

        <!-- NK to NG -->
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">
            "Nk" Endings become "ng"
          </h3>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              />
              <span
                ><span class="px-1">renk → rengim</span> -
                <em>my color</em></span
              >
            </li>
          </ul>
        </div>

        <!-- Y Buffer -->
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">
            "y" Buffer for Very Short Words
          </h3>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              />
              <span
                ><span class="px-1">su → suyumuz</span> -
                <em>our water</em></span
              >
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              />
              <span
                ><span class="">neyin nesi</span> - <em>what is this?</em></span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";

// Component logic can be added here if needed
</script>
