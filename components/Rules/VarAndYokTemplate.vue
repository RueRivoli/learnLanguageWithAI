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
            In Turkish, "var" and "yok" are essential expressions used to
            indicate
            <span class="underline">presence and absence.</span>
            They function much like "there is/are" and "there isn't/aren't" in
            English, helping you describe everyday situations with ease.
          </p>
        </div>
      </div>
    </div>
    <!-- End Header -->

    <!-- Basic Concepts -->
    <div class="bg-gray-50 border-base-200 rounded-xl p-5 border shadow-sm">
      <div class="flex items-center gap-3 mb-6">
        <h2 class="text-xl font-bold text-gray-900">Basic Concepts</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-8 h-8 bg-success/70 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">✓</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Var</h3>
          </div>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="text-lg m-auto font-bold text-gray-700">
                "There is" / "There are"
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="text-sm m-auto text-gray-600 font-medium">
                Indicates presence or existence
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-8 h-8 bg-error/70 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-sm">✗</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Yok</h3>
          </div>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="text-lg m-auto font-bold text-gray-700">
                "There isn't" / "There aren't"
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="text-sm m-auto text-gray-600 font-medium">
                Indicates absence or non-existence
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />

    <!-- Usage Rules -->
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

        <h2 class="text-lg font-semibold text-gray-900">Usage Rules</h2>
      </div>
      <p class="font-semibold text-gray-700 mb-3">
        "Var" and "yok" usually appear at the end of the sentence and can be
        used in four key ways:
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">Positive Statement</h3>
          <p class="font-medium text-gray-900 mb-2">Location + noun + var</p>
          <div class="text-gray-700">
            <span class="font-medium"
              >Odada örümcek <strong class="text-primary">var</strong></span
            >
            -
            <em>There is a spider in the room</em>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">Negative Statement</h3>
          <p class="font-medium text-gray-900 mb-2">Location + noun + yok</p>
          <div class="text-gray-700">
            <span class="font-medium"
              >Garajda araba <strong class="text-primary">yok</strong></span
            >
            -
            <em>There isn't a car in the garage</em>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">Positive Question</h3>
          <p class="font-medium text-gray-900 mb-2">
            Location + noun + var + mı?
          </p>
          <div class="text-gray-700">
            <span class="font-medium"
              >Garajda araba <strong class="text-primary">var mı</strong>?</span
            >
            -
            <em>Is there a car in the garage?</em>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 class="font-medium text-primary">Negative Question</h3>
          <p class="font-medium text-gray-900 mb-2">
            Location + noun + yok + mu?
          </p>
          <div class="text-gray-700">
            <span class="font-medium"
              >Parkta annen <strong class="text-primary">yok mu</strong>?</span
            >
            -
            <em>Isn't there your mother in the park?</em>
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
        <!-- Positive Statements -->
        <div class="border-l-4 border-success pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">
            Positive Statements – "Var"
          </h3>
          <p class="text-gray-700 text-sm mb-2">
            "Var" means "there is" or "there are."
          </p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Odada örümcek <strong class="text-success">var</strong></span
                >
                <em> – There is a spider in the room.</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Parkta bisiklet
                  <strong class="text-success">var</strong></span
                >
                <em> – There is a bicycle in the park.</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Futbol sahasında top
                  <strong class="text-success">var</strong></span
                >
                <em> – There is a ball on the football field.</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-success rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Bahçede bir kişi
                  <strong class="text-success">var</strong></span
                >
                <em> – There is a person in the garden.</em>
              </span>
            </li>
          </ul>
        </div>
        <br />

        <!-- Negative Statements -->
        <div class="border-l-4 border-success pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">
            Negative Statements – "Yok"
          </h3>
          <p class="text-gray-700 text-sm mb-2">
            "Yok" expresses the absence of something, meaning "there isn't" or
            "there aren't."
          </p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-error rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Garajda araba <strong class="text-success">yok</strong></span
                >
                <em> – There isn't a car in the garage.</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-error rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Mağazada çocuk
                  <strong class="text-success">yok</strong></span
                >
                <em> – There isn't a child in the store.</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-error rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Camide müezzin
                  <strong class="text-success">yok</strong></span
                >
                <em> – There isn't a muezzin in the mosque.</em>
              </span>
            </li>
          </ul>
        </div>
        <br />

        <!-- Positive Questions -->
        <div class="border-l-4 border-success pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">
            Positive Questions – "Var mı?"
          </h3>
          <p class="text-gray-700 text-sm mb-2">
            To form a yes/no question, simply add "mı/mi/mu/mü" to "var,"
            following vowel harmony.
          </p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-info rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Garajda araba
                  <strong class="text-success">var mı</strong>?</span
                >
                <em> – Is there a car in the garage?</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-info rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Trende yolcu
                  <strong class="text-success">var mı</strong>?</span
                >
                <em> – Is there a passenger on the train?</em>
              </span>
            </li>
          </ul>
        </div>
        <br />

        <!-- Negative Questions -->
        <div class="border-l-4 border-success pl-4">
          <h3 class="font-semibold text-gray-900 mb-2">
            Negative Questions – "Yok mu?"
          </h3>
          <p class="text-gray-700 text-sm mb-2">
            For a negative question, add "mu" to "yok."
          </p>
          <ul class="space-y-1 text-sm text-gray-700">
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-warning rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Parkta çocuk
                  <strong class="text-success">yok mu</strong>?</span
                >
                <em> – Isn't there a child in the park?</em>
              </span>
            </li>
            <li class="flex items-start gap-2">
              <span
                class="w-1 h-1 bg-warning rounded-full mt-2 flex-shrink-0"
              ></span>
              <span>
                <span class=""
                  >Futbol sahasında top
                  <strong class="text-success">yok mu</strong>?</span
                >
                <em> – Isn't there a ball on the football field?</em>
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
