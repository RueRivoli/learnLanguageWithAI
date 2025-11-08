<script setup lang="ts">
import {
  ArrowLongRightIcon,
  ArrowTopRightOnSquareIcon,
  StarIcon,
  CheckCircleIcon,
  ChartBarIcon,
} from "@heroicons/vue/24/solid";

// Animation des langues avec effet d'écriture
const languages = [
  { name: "Turkish", color: "text-red-500" },
  { name: "French", color: "text-blue-500" },
  { name: "Spanish", color: "text-amber-500" },
];
const currentLanguageIndex = ref(0);
const displayedText = ref("");
const isTyping = ref(false);

const currentLanguage = computed(() => languages[currentLanguageIndex.value]);

const typeText = async (language: { name: string; color: string }) => {
  isTyping.value = true;
  displayedText.value = "";

  // Ajouter un espace et le "?" à la fin du texte
  const textWithQuestion = language.name + " ?";

  for (let i = 0; i <= textWithQuestion.length; i++) {
    displayedText.value = textWithQuestion.slice(0, i);
    await new Promise((resolve) => setTimeout(resolve, 100)); // Vitesse d'écriture
  }

  // Pause avant de commencer à effacer
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Effacer le texte (y compris le "?")
  for (let i = textWithQuestion.length; i >= 0; i--) {
    displayedText.value = textWithQuestion.slice(0, i);
    await new Promise((resolve) => setTimeout(resolve, 50)); // Vitesse d'effacement plus rapide
  }

  isTyping.value = false;
};

onMounted(() => {
  const cycleLanguages = async () => {
    for (let i = 0; i < languages.length; i++) {
      currentLanguageIndex.value = i;
      await typeText(languages[i]);
    }
    // Recommencer le cycle
    setTimeout(cycleLanguages, 500);
  };

  // Démarrer le cycle après un court délai
  setTimeout(cycleLanguages, 1000);
});
</script>

<template>
  <section class="relative overflow-hidden bg-neutral/10 min-h-[70vh]">
    <!-- Background: soft gradient base + subtle grid + refined glows -->

    <div
      class="mx-auto max-w-7xl px-6 sm:px-8 md:px-10 xl:px-12 pt-14 pb-20 sm:pt-36 sm:pb-32 lg:pt-34 lg:pb-40"
    >
      <div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <!-- Left: Copy -->
        <div class="space-y-10">
          <div class="space-y-6">
            <h1
              class="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral text-balance"
            >
              No Progress While Learning<br />
              <span :class="[currentLanguage.color, 'language-text']">
                {{ displayedText }}<span class="typing-cursor">|</span>
              </span>
              <br />
              Try <span class="text-primary">Tookan AI</span>
            </h1>
            <p class="text-lg sm:text-xl text-base-content/70 leading-relaxed">
              Use the
              <span class="font-bold text-primary">Best AI Tools</span> to
              Generate Lessons on your
              <span class="font-bold text-primary">Weaknesses</span> and Test
              your Progress with Quizzes Prepared by our
              <span class="font-bold text-primary">Qualified Teachers</span>
            </p>
          </div>

          <!-- Inline benefits -->
          <ul
            class="flex flex-wrap gap-x-6 gap-y-3 text-base text-base-content/70"
          >
            <li class="flex items-center gap-2">
              <CheckCircleIcon class="h-5 w-5 text-primary" /><span
                >Tailored Lessons</span
              >
            </li>
            <li class="flex items-center gap-2">
              <CheckCircleIcon class="h-5 w-5 text-warning" /><span
                >Progress WAY Faster</span
              >
            </li>
            <li class="flex items-center gap-2">
              <CheckCircleIcon class="h-5 w-5 text-neutral" /><span
                >Quizzes From Challenging Teachers</span
              >
            </li>
          </ul>

          <!-- CTAs + UsedBy -->
          <div class="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
            <NuxtLink
              :to="{
                path: '/authorization/auth/?toCreateAccount=true',
                query: { toCreateAccount: 'true' },
              }"
              class="btn btn-primary text-lg font-semibold px-8 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Get Started For Free
              <ArrowLongRightIcon class="h-5 w-5" />
            </NuxtLink>
            <NuxtLink
              to="/marketing/working-explanation"
              class="btn btn-ghost text-lg font-semibold px-8"
            >
              <ArrowTopRightOnSquareIcon class="h-5 w-5" />
              Learn more
            </NuxtLink>
          </div>

          <div
            class="mt-2 w-full inline-flex items-center gap-3 px-4 py-2"
          >
            <MarketingUsedBy />
          </div>
        </div>

        <div class="flex flex-col gap-4 items-center justify-center">
          <img src="/public/heroillustrationtransparent.png" alt="" class="w-800 h-auto" />

          <!-- <img src="/public/hero2.png" alt="Call to Action" class="w-600 h-auto" />
         <img src="/public/hero1.png" alt="" class="w-600 h-auto" /> -->
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.language-text {
  display: inline-block;
  min-width: 120px; /* Assure une largeur fixe pour éviter le décalage */
  text-align: left;
  position: relative;
}

.typing-cursor {
  animation: blink 1s infinite;
  color: inherit;
  font-weight: inherit;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

/* Animation subtile pour le texte qui s'écrit */
.language-text {
  transition: all 0.1s ease-in-out;
}
</style>
