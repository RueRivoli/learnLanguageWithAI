<template>
  <div class="max-w-4xl mx-auto p-6 space-y-6">
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
            How to say "my dog", "his teacher" in Turkish ? <br />
            Possession is expressed using consistent and logical suffixes
            <span class="underline">
              applied to both the owner and the thing owned.</span
            >
            Once you grasp the pattern, it becomes intuitive and reliable.
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
          How to Create Possessive Pronouns?
        </h2>
      </div>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2 leading-relaxed">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            For the owner suffix use:<br>
            <code
              class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
              >-nın/nin/nun/nün</code
            > 
            or
            <code
              class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
            >
              -ın/in/un/ün</code
            >
            if it ends in a consonant
          </span>
        </li>
        <li class="flex items-start gap-2 leading-relaxed">
          <span
            class=" w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            For the owned item/person suffix use:<br>
            <code
              class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
              >-sı/si/su/sü</code
            >
            or
            <code
              class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
            >
              -ı/i/u/ü</code
            >
            if it ends in a consonant
          </span>
        </li>
      </ul>
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
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span class=""
                >Annem<strong class="text-success">in </strong> araba<strong
                  class="text-success"
                  >sı</strong
                >
                - <em>my mother's car</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span class=""
                >öğretmen<strong class="text-success">in </strong> şapka<strong
                  class="text-success"
                  >sı</strong
                >
                - <em>the teacher's hat</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span class=""
                >Çocuğ<strong class="text-success">un</strong
                >kalem<strong
                  class="text-success"
                  >i</strong
                >
                - <em>the child's pen</em>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <br />


    <!-- Possesive pronouns -->
    <div class="bg-gray-50 rounded-lg p-5 border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900 mb-3">
        Possessive Pronouns
      </h2>
      <ul class="space-y-2 text-gray-700 leading-relaxed">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            If you are using a pronoun such as<span>sen</span> (you) or <span>ben </span>(me) to talk about the owner of
            something, you still mark that pronoun with the "owner" ending
            <span class="px-1">
              <code class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm">‑nın</code>
             </span> <br />
          </span>
        </li>
        <li class="flex items-start gap-2 leading-relaxed">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            But the first person pronouns "ben" and "biz" get a slightly
            different "owner" ending
            <span class="px-1"> <code class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm">‑ım</code></span>
          </span>
        </li>
      </ul>
    </div>
    <br />

    <div>
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
                  class="text-center px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wide"
                >
                  Form
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                    <span class="text-smtext-gray-900">Benim (my)</span>
                  </div>
                </td>
                <td class="text-center px-6 py-4">
                  <code class="px-3 py-1 font-semibold text-sm text-gray-700">
                    noun + (ı/i/u/ü) + m
                  </code>
                </td>
              </tr>
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                    <span class="text-sm text-gray-900">Senin (your)</span>
                  </div>
                </td>
                <td class="text-center px-6 py-4">
                  <code class="px-3 py-1 font-semibold text-sm text-gray-700">
                    noun + (ı/i/u/ü) + n
                  </code>
                </td>
              </tr>
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                    <span class="text-sm text-gray-900"
                      >Onun (his/her/its)</span
                    >
                  </div>
                </td>
                <td class="text-center px-6 py-4">
                  <code class="px-3 py-1 text-sm font-semibold text-gray-700">
                    noun + (s) + ı/i/u/ü
                  </code>
                </td>
              </tr>
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                    <span class="text-sm text-gray-900">Bizim (our)</span>
                  </div>
                </td>
                <td class="text-center px-6 py-4">
                  <code class="px-3 py-1 font-semibold text-sm text-gray-700">
                    noun + (ı/i/u/ü) + mız/miz/muz/müz
                  </code>
                </td>
              </tr>
              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                    <span class="text-sm text-gray-900"
                      >Sizin (your - plural)</span
                    >
                  </div>
                </td>
                <td class="text-center px-6 py-4">
                  <code class="px-3 py-1 text-sm font-semibold text-gray-700">
                    noun + (ı/i/u/ü) + nız/niz/nuz/nüz
                  </code>
                </td>
              </tr>

              <tr class="hover:bg-primary/5 transition-colors duration-150">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="w-2 h-2 bg-indigo-500 rounded-full mr-3" ></div>
                    <span class="text-sm text-gray-900">Onların (their)</span>
                  </div>
                </td>
                <td class="text-center px-6 py-4">
                  <code class="px-3 py-1 text-sm font-semibold text-gray-700">
                    noun + (s) + ı/i/u/ü or + lar/ler + ı/i/u/ü
                  </code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <br />


     <!-- Careful -->
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
        <h2 class="text-lg font-semibold text-gray-900">
          Careful
        </h2>
      </div>

      <div class="space-y-4">
        <!-- Proper Names -->
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">Proper Names</h3>
          <p class="text-gray-700 text-sm mb-2">
            In the table above:
          </p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  ><strong class="text-amber-600">ı/i/u/ü </strong>is added 
                  only if preceded by a <strong class="text-amber-600">consonant</strong></span
                >
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  ><strong class="text-amber-600">s</strong> is added 
                  only if preceded by a <strong class="text-amber-600">vowel</strong></span
                >
              </span>
            </li>
          </ul>
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
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span class=""
                >Ben<strong class="text-success">im </strong> çay<strong
                  class="text-success"
                  >ım</strong
                >
                - <em>my tea</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span class=""
                >Sen<strong class="text-success">in </strong> baba<strong
                  class="text-success"
                  >n</strong
                >
                - <em>your dad</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span class=""
                >On<strong class="text-success">un </strong> kale<strong
                  class="text-success"
                  >si</strong
                >
                - <em>his pen</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span class=""
                >Biz<strong class="text-success">im </strong> ev<strong
                  class="text-success"
                  >imiz</strong
                >
                - <em>our house</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span class=""
                >Siz<strong class="text-success">in </strong> masa<strong
                  class="text-success"
                  >sınız</strong
                >
                - <em>your table (plur)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span class=""
                >Onlar<strong class="text-success">ın </strong>
                televizyon<strong class="text-success">ları</strong> -
                <em>their television(s)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
          <span>
            <span class=""
              >Benim anne<strong class="text-success">m</strong> bir
              mimar</span
            >
            -
            <em>My mother is an architect</em>
          </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
          <span>
            <span class=""
              >Bu ben<strong class="text-success">im</strong> oğlum</span
            >
            -
            <em>This is my son</em>
          </span>
        </li>
          </ul>
        </div>
      </div>
    </div>
    <br />
    
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
        <h2 class="text-lg font-semibold text-gray-900">
          Exceptions to the rule
        </h2>
      </div>

      <div class="space-y-4">
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">Voiceless consonants get impacted</h3>
          <p class="text-gray-700 text-sm mb-2">
            <code
              class="bg-white px-2 py-1 rounded border border-amber-200 text-neutral text-sm"
              >ç / p / t / k</code
            >  are impacted as usual by adding a suffix starting with a vowel
          </p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Ara<strong class="text-amber-600">ç</strong> <em>(vehicule)</em> -> 
                  Senin ara<strong class="text-amber-600">cın</strong>
                  </span
                >
                -
                <em>(your vehicule)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Kâğı<strong class="text-amber-600">t</strong> <em>(paper)</em> -> 
                  Çocu<strong class="text-amber-600">ğun</strong> kâğı<strong class="text-amber-600">dı</strong>
                  </span
                >
                -
                <em>(the child's paper)</em>
              </span>
            </li>
          </ul>
        </div>
       
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
              ></span>
              <span>
                <span class=""
                  >Türkiye<strong class="text-amber-600">'nin</strong>
                  şehirler<strong class="text-amber-600">i</strong></span
                >
                -
                <em>Türkiye's cities</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
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
              ></span>
              <span><span class="px-1">izin <em>(permission)</em> → benim <strong
                    class="text-amber-600"
                    >iznim</strong
                  > - <em>(my permission)</em></span></span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span><span class="px-1">oğul <em>(son)</em> → Onun<strong
                    class="text-amber-600"
                    > oğlu </strong
                  > - <em>(his/her son)</em></span></span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span><span class="px-1">şehir <em>(city)</em> → (bizim)<strong
                    class="text-amber-600"
                    > şehrimiz</strong
                  > - <em>(our city)</em></span></span>
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
              > </span>
              <span
                ><span class="">Bizim mahalle</span> -
                <em>Our neighborhood</em></span
              >
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              > </span>
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
              ></span>
              <span
                ><span class="px-1">hat → hat<strong
                    class="text-amber-600"
                    >tım</strong
                  > </span> - <em>my line</em></span
              >
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span
                ><span class="px-1">hak → hak<strong
                    class="text-amber-600"
                    >kın</strong
                  > </span> -
                <em>your right</em></span
              >
            </li>
          </ul>
        </div>

        <!-- Vowel Duplication -->
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">Vowel Duplication</h3>
          <p class="text-gray-700 text-sm mb-2">
            A few Turkish words repeat the vowel instead of adding an s
          </p>
          <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span
                ><span class="px-1">
                  cami <em>(mosque)</em> → mahallenin cami<strong
                    class="text-amber-600"
                    >i</strong
                  ></span
                >
                - <em>(the neighborhood's mosque)</em></span
              >
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span
                ><span class="px-1">
                  mevzu <em>(topic)</em> → kavganın mevzu<strong
                    class="text-amber-600"
                    >u</strong
                  ></span
                >
                - <em>(the topic of the fight)</em></span
              >
            </li>
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
              ></span>
              <span
                ><span class="px-1">renk <em>(color)</em> → ren<strong
                    class="text-amber-600"
                    >g</strong
                  >im</span> -
                <em>(my color)</em></span
              >
            </li>
          </ul>
        </div>

        <!-- Y Buffer -->
        <div class="border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">
            "y" Buffer for Very Short Words
          </h3>
          <p class="text-gray-700 text-sm mb-2">
            For a very few words with 2 letters, y is used as a buffer
          </p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span
                ><span class="px-1">su <em>(water)</em>→ banyonun su<strong
                    class="text-amber-600"
                    >y</strong
                  >u</span> -
                <em>(the bath's water)</em></span
              >
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
