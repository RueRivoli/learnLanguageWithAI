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
  { name: 'Turkish', color: 'text-red-500' },
  { name: 'French', color: 'text-blue-500' },
  { name: 'Spanish', color: 'text-amber-500' }
];
const currentLanguageIndex = ref(0);
const displayedText = ref('');
const isTyping = ref(false);

const currentLanguage = computed(() => languages[currentLanguageIndex.value]);

const typeText = async (language: { name: string, color: string }) => {
  isTyping.value = true;
  displayedText.value = '';
  
  // Ajouter un espace et le "?" à la fin du texte
  const textWithQuestion = language.name + ' ?';
  
  for (let i = 0; i <= textWithQuestion.length; i++) {
    displayedText.value = textWithQuestion.slice(0, i);
    await new Promise(resolve => setTimeout(resolve, 100)); // Vitesse d'écriture
  }
  
  // Pause avant de commencer à effacer
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Effacer le texte (y compris le "?")
  for (let i = textWithQuestion.length; i >= 0; i--) {
    displayedText.value = textWithQuestion.slice(0, i);
    await new Promise(resolve => setTimeout(resolve, 50)); // Vitesse d'effacement plus rapide
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
    <div class="absolute inset-0 -z-10 pointer-events-none">
      <!-- Base gradient wash (slightly stronger) -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary/10 via-gray-100/80 to-warning/10 dark:via-gray-800/80" />

      <!-- Angled sheen overlay (slightly stronger) -->
      <div
        class="absolute -top-32 left-1/3 w-[1400px] h-[900px] rotate-[18deg] opacity-60"
        style="background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.1) 50%, transparent 80%); clip-path: polygon(0 0, 100% 0, 80% 100%, 0% 100%);"
      />
      <!-- Vignette -->
      <div class="absolute inset-0 bg-[radial-gradient(1200px_circle_at_center,transparent_40%,rgba(0,0,0,0.08))] dark:bg-[radial-gradient(1200px_circle_at_center,transparent_40%,rgba(0,0,0,0.22))]" />
    </div>

    <div class="mx-auto max-w-7xl px-6 sm:px-8 md:px-10 xl:px-12 pt-24 pb-20 sm:pt-36 sm:pb-32 lg:pt-44 lg:pb-40">
      <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <!-- Left: Copy -->
        <div class="space-y-10">
          <div class="space-y-6">
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral dark:text-white text-balance">
              No Progress While Learning<br>
              <span :class="[currentLanguage.color, 'language-text']">
                {{ displayedText }}<span class="typing-cursor">|</span>
              </span> <br></br>
              Try <span class="text-primary">Tookan AI</span>
            </h1>
            <p class="text-lg sm:text-xl text-base-content/70 leading-relaxed">
              Use the <span class="font-bold text-primary">Best AI Tools</span> to Generate Lessons on your <span class="font-bold text-primary">Weaknesses</span> and Test your Progress with Quizzes Prepared by our <span class="font-bold text-primary">Qualified Teachers</span>
            </p>
          </div>

          <!-- Inline benefits -->
          <ul class="flex flex-wrap gap-x-6 gap-y-3 text-base text-base-content/70">
            <li class="flex items-center gap-2"><CheckCircleIcon class="h-5 w-5 text-primary" /><span>Tailored Lessons</span></li>
            <li class="flex items-center gap-2"><CheckCircleIcon class="h-5 w-5 text-warning" /><span>Progress WAY Faster</span></li>
            <li class="flex items-center gap-2"><CheckCircleIcon class="h-5 w-5 text-neutral" /><span>Quizzes From Challenging Teachers</span></li>
          </ul>

          <!-- CTAs + UsedBy -->
          <div class="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
            <NuxtLink
              :to="{ path: '/authorization/auth/', query: { toCreateAccount: 'true' } }"
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

          <div class="mt-2 w-full inline-flex items-center gap-3 rounded-lg bg-base-200/70 px-4 py-2 ring-1 ring-base-content/10 backdrop-blur-sm">
            <MarketingUsedBy />
          </div>
        </div>

        <!-- Right: Product mockup -->
        <div class="relative mx-auto w-full max-w-xl">
          <!-- Main card -->
          <div class="relative rounded-3xl bg-base-100 shadow-2xl ring-1 ring-base-content/10 p-6 sm:p-7">
            <div class="grid grid-cols-12 gap-4">
              <!-- Side nav icons -->
              <div class="col-span-2 sm:col-span-1 flex flex-col items-center gap-3 py-2">
                <div class="w-8 h-8 rounded-xl bg-primary/10 grid place-items-center text-primary text-sm font-bold">A</div>
                <div class="w-8 h-8 rounded-xl bg-primary/10 grid place-items-center text-primary text-sm font-bold">B</div>
                <div class="w-8 h-8 rounded-xl bg-primary/10 grid place-items-center text-primary text-sm font-bold">C</div>
              </div>
              <!-- Content -->
              <div class="col-span-10 sm:col-span-11 space-y-4">
                <div class="grid grid-cols-2 gap-3">
                  <div class="rounded-xl ring-1 ring-base-content/10 p-3">
                    <p class="text-xs text-base-content/60">New quiz</p>
                    <p class="mt-1 font-semibold">Vocabulary</p>
                  </div>
                  <div class="rounded-xl ring-1 ring-base-content/10 p-3">
                    <p class="text-xs text-base-content/60">Score</p>
                    <p class="mt-1 font-semibold">92%</p>
                  </div>
                </div>
                <div class="rounded-2xl ring-1 ring-base-content/10 p-4">
                  <p class="text-sm font-medium mb-3">Ownership</p>
                  <div class="flex items-center gap-4">
                    <div class="size-24 rounded-full shadow-inner" style="background:conic-gradient(var(--color-primary) 0 120deg, var(--color-warning) 0 210deg, oklch(80% 0.03 260 / 0.8) 0);"></div>
                    <ul class="text-xs text-base-content/60 space-y-1">
                      <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-primary inline-block"></span>Vocabulary</li>
                      <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-warning inline-block"></span>Grammar</li>
                      <li class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-neutral inline-block"></span>Other</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Floating card bottom-right -->
          <div class="absolute -right-8 -bottom-8 w-48 sm:w-56 rounded-2xl bg-base-100 shadow-xl ring-1 ring-base-content/10 p-4">
            <p class="text-xs text-base-content/60">Recent activity</p>
            <div class="mt-2 flex items-center gap-2">
              <div class="size-8 rounded-full bg-warning/20" />
              <div>
                <p class="text-sm font-medium">New words learned</p>
                <p class="text-xs text-base-content/60">+18 this week</p>
              </div>
            </div>
          </div>

          <!-- Floating pill top-left -->
          <div class="absolute -left-6 sm:-left-10 -top-6 sm:-top-10 inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-2 ring-1 ring-primary/20">
            <span class="w-2 h-2 rounded-full bg-primary"></span>
            <span class="text-xs font-medium">Live progress</span>
          </div>
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
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

/* Animation subtile pour le texte qui s'écrit */
.language-text {
  transition: all 0.1s ease-in-out;
}
</style>
