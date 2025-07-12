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
            In English, to express where is someone or something, we can use prepositions such as 'in', 'on' or 'at'. 
            In Turkish, <span class="underline">it always includes the locative case.</span></p>
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

        <h2 class="text-lg font-semibold text-gray-900">How to Form Locative Case?</h2>
      </div>
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            The locative case is the case that answers the question <strong class="text-primary">"where?"</strong> 
          </span>
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <span>
            We form it by adding <strong class="text-primary">-da</strong> or <strong class="text-primary">-de</strong> to the noun according to the vowel harmony applied to the last vowel of the noun (see below)
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
                suffix -> da
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
                suffix -> de
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <br>
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
            Answering the question "Where ..." ?
          </h3>
          <p class="text-gray-700 text-sm mb-2">
            When a question contains "Nerede", you need to use the locative form to answer
          </p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >(Siz) <strong class="text-success"
                    >nerede</strong
                  >siniz <em>(where are you?)</em> -> hastane<strong class="text-success"
                    >de</strong
                  >yiz
                </span>
                <em>(we are at the hospital)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Bu akşam parti  <strong class="text-success"
                    >nerede</strong
                  >? <em>(where is the party tonight?)</em> -> ev<strong class="text-success"
                    >de</strong
                  > parti yapıyoruz
                </span>
                <em>(we make the party at home)</em>
              </span>
            </li>
          </ul>
        </div>


        <div class="border-l-4 border-success pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">
            Other sentences
          </h3>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >rüy<strong class="text-success"
                    >a</strong
                  >  <em>(dream)</em> -> rüyam<strong class="text-success"
                    >da</strong
                  > çok çiçek vardır 
                </span>
                <em>(in my dream there were a lot of flowers)</em> — because the last vowel is a hard vowel
                <em>(a)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                cadd<strong class="text-success"
                    >e</strong
                  >
                 <em> (avenue/street)</em> -> cadde<strong class="text-success"
                    >de</strong
                  > müzisyenler müzik çalıyor
                <em>(the musicians play music in the street)</em> — because the last vowel is a soft vowel
                <em>(e)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                kap<strong class="text-success"
                    >ı</strong
                  >
                 <em> (door)</em> -> kapı<strong class="text-success"
                    >da</strong
                  > bir adam var
                <em>(there is a man at the door)</em> — because the last vowel is a hard vowel
                <em>(ı)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                d<strong class="text-success"
                    >i</strong
                  >l
                 <em> (language)</em> -> bu dil<strong class="text-success"
                    >de</strong
                  > çok fazla istisna var
                <em>(there is many exceptions in this language)</em> — because the last vowel is a soft vowel
                <em>(i)</em>
              </span>
            </li>
          </ul>
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

        <h2 class="text-lg font-semibold text-gray-900">When the Noun Ends in a "Voiceless" Consonant</h2>
      </div>
        
      <ul class="space-y-2 text-gray-700">
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <p class="text-gray-700 mb-3">
            In linguistics, a voiceless consonant is a consonant that is pronounced without vibrating the vocal chords. 
          </p> 
        </li>
        <li class="flex items-start gap-2">
          <span
            class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
          ></span>
          <p class="text-gray-700 mb-3">
        When adding the locative suffix after a word ending in a "voiceless consonant" <br>
        <code
              class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
              >ç / f / h / k / p / s / ş / t  </code
            >  , <code
              class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
              >d</code
            >  becomes <code
              class="bg-white px-2 py-1 rounded border border-primary text-primary text-sm"
              >t</code
            > 
      </p>
           
        </li>
      </ul>
    </div>
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
                  >Resim <strong class="text-success"
                    >nerede</strong
                  >? <em>(where is the picture?)</em> -> kitap<strong class="text-success"
                    >ta</strong
                  > 
                </span>
                <em> (in the book)</em> — because the letter vowel is a voiceless consonant
                <em>(p)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Abla <strong class="text-success"
                    >neredesin</strong
                  >? <em>(sister, where are you?)</em> -> Mutfak<strong class="text-success"
                    >ta</strong
                  >yım
                </span>
                <em> (I am in the kitchen)</em> — because the letter vowel is a voiceless consonant
                <em>(k)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Selin yarın <strong class="text-success"
                    >nerede</strong
                  > olacak? <em>(where will be Selin tomorrow?)</em> -> iş<strong class="text-success"
                    >te</strong
                  > olacak
                </span>
                <em> (she'll be at work)</em> — because the letter vowel is a voiceless consonant
                <em>(ş)</em>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <br>
      <div>
      <h2 class="text-lg font-semibold text-gray-900 mb-3">
        How To Say "Here", "There" ?
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
                    Demonstrative Pronoun
                  </th>
                  <th
                    class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                  >
                    Locative Form
                  </th>
                  <th
                    class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                  >
                    Meaning
                  </th>
                  <th
                    class="px-6 py-4 text-center text-sm font-bold text-gray-700 tracking-wide"
                  >
                    Usage
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >bu</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      bu<strong class="text-primary">rada</strong>
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      here
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      for something close
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >şu</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                    şu<strong class="text-primary">rada</strong>
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                      here / there
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-center text-gray-700"
                    >
                      to raise attention on something
                    </span>
                  </td>
                </tr>
                <tr class="hover:bg-primary/5 transition-colors duration-150">
                  <td class="px-6 py-4 text-center">
                    <div class="flex items-center">
                      <div class="w-2 h-2 bg-primary rounded-full mr-3" ></div>
                      <span class="text-sm font-semibold text-gray-900"
                        >o</span
                      >
                    </div>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >o<strong class="text-primary">rada</strong>
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                      >there
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <span
                      class="font-semibold px-3 py-1 rounded-lg text-gray-700"
                    >
                    for something far
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </div>
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
                    >Nerede </strong
                  >kitap? <em>(where is the book?)</em> -> <strong class="text-success"
                    >burada</strong
                  > kitap
                </span>
                <em> (the book is here)</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  > <strong class="text-success"
                    >Şurada</strong
                  > bir kedi oturuyor  <em>(there is a cat over there)</em> 
                </span>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  > <strong class="text-success"
                    >Orada</strong
                  >  insanlar bekliyor  <em>(People are waiting there)</em> 
                </span>
              </span>
            </li>
          </ul>
        </div>
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
        <h2 class="text-lg font-semibold text-gray-900">
          Pronunciation in daily conversations
        </h2>
      </div>
      <div class="space-y-4">
        <!-- Proper Names -->
        <div class="mt-2 border-l-4 border-amber-200 pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">
            These locative forms are pronounced a bit different in reality
          </h3>

          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >nerede → <em>is pronounced </em> "ne<strong class="text-amber-600">r</strong>de"</span
                >
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >burada → <em>is pronounced </em> "bu<strong class="text-amber-600">r</strong>da"</span
                >
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >şurada → <em>is pronounced </em> "şu<strong class="text-amber-600">r</strong>da"</span
                >
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >orada → <em>is pronounced </em> "o<strong class="text-amber-600">r</strong>da"</span
                >
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
      </div>
      </div>
    </div>
    </div>
  </div>
</template>
