<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    formQuiz?: any;
    quiz?: boolean;
    task: "completion";
  }>(),
  {
    formQuiz: null,
    quiz: false,
  },
);
</script>

<template>
  <!-- Sidebar -->
  <div class="lg:w-80 lg:flex-shrink-0">
    <div class="lg:sticky lg:top-6">
      <div class="relative overflow-hidden rounded-2xl shadow-xl border-0 p-0">
        <!-- Stunning background with primary color inspiration -->
        <div
          class="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/15 to-primary/10"
        />
        <div
          class="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-primary/20"
        />
        <div
          class="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(var(--color-primary-500),0.05)_25%,rgba(var(--color-primary-500),0.05)_75%,transparent_75%)] bg-[size:20px_20px] opacity-60"
        />

        <!-- Subtle animated elements -->
        <div
          class="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-lg animate-pulse"
        />
        <div
          class="absolute bottom-6 left-6 w-8 h-8 bg-gradient-to-tr from-primary/15 to-transparent rounded-full blur-md animate-bounce"
        />

        <!-- Content container with glass morphism -->
        <div
          class="relative z-10 bg-white/95 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg"
        >
          <!-- Inner glow effect -->
          <div
            class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/8 rounded-2xl"
          />

          <!-- Content -->
          <div class="relative z-20 p-6">
            <!-- Header -->
            <div class="flex items-center gap-3 mb-6">
              <div
                class="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-md shadow-primary/20"
              >
                <svg
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div v-if="props.task === 'completion'">
                <h3 class="text-lg font-bold text-gray-900">Quiz Progress</h3>
                <p class="text-sm text-gray-600">Track your completion</p>
              </div>
              <div v-else>
                <h3 class="text-lg font-bold text-gray-900">Quiz Result</h3>
                <p class="text-sm text-gray-600">Check your results</p>
              </div>
            </div>

            <!-- Progress Overview - Organized Grid -->
            <div class="grid grid-cols-3 gap-3 mb-6">
              <!-- Total Questions -->
              <div
                class="text-center p-3 bg-gray-50 rounded-lg border border-gray-200/60"
              >
                <div class="text-lg font-bold text-gray-900">
                  {{ props.quiz.length }}
                </div>
                <div class="text-xs text-gray-600">Total</div>
              </div>

              <!-- Answered Questions -->
              <div
                v-if="props.task === 'completion'"
                class="text-center p-3 bg-primary/10 rounded-lg border border-primary/20"
              >
                <div class="text-lg font-bold text-primary">
                  {{
                    Object.values(props.formQuiz).filter(
                      (q: any) => q.selectedOption !== null,
                    ).length
                  }}
                </div>
                <div class="text-xs text-primary/70">Answered</div>
              </div>
              <div
                v-else
                class="text-center p-3 bg-success/10 rounded-lg border border-success/20"
              >
                <div class="text-lg font-bold text-success">
                  {{
                    Object.values(props.formQuiz).filter(
                      (q: any) => q.selectedOption !== null,
                    ).length
                  }}
                </div>
                <div class="text-xs text-success/70">Correct</div>
              </div>

              <!-- Remaining Questions -->
              <div
                class="text-center p-3 bg-orange-50 rounded-lg border border-orange-200/60"
              >
                <div class="text-lg font-bold text-orange-600">
                  {{
                    props.quiz.length -
                    Object.values(props.formQuiz).filter(
                      (q: any) => q.selectedOption !== null,
                    ).length
                  }}
                </div>
                <div class="text-xs text-orange-600/70">Remaining</div>
              </div>
            </div>

            <!-- Enhanced Progress Bar -->
            <div class="mb-6">
              <div class="flex items-center justify-between mb-3">
                <span class="text-sm font-semibold text-gray-700"
                  >Completion</span
                >
                <span class="text-lg font-bold text-primary">
                  {{
                    Math.round(
                      (Object.values(props.formQuiz).filter(
                        (q: any) => q.selectedOption !== null,
                      ).length /
                        quiz.length) *
                        100,
                    )
                  }}%
                </span>
              </div>

              <!-- Beautiful progress bar -->
              <div class="relative">
                <div class="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                  <div
                    class="relative h-3 rounded-full transition-all duration-500 ease-out overflow-hidden"
                    :style="{
                      width: `${(Object.values(props.formQuiz).filter((q: any) => q.selectedOption !== null).length / quiz.length) * 100}%`,
                    }"
                  >
                    <!-- Main gradient fill -->
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-full"
                    />

                    <!-- Shimmer effect -->
                    <div
                      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full animate-pulse"
                    />

                    <!-- Glow effect -->
                    <div
                      class="absolute inset-0 bg-primary/20 rounded-full blur-sm"
                    />
                  </div>
                </div>

                <!-- Progress indicator dot -->
                <div
                  class="absolute top-0 w-3 h-3 bg-white border-2 border-primary rounded-full shadow-md transform -translate-y-0.5 transition-all duration-500 ease-out"
                  :style="{
                    left: `calc(${(Object.values(props.formQuiz).filter((q: any) => q.selectedOption !== null).length / quiz.length) * 100}% - 6px)`,
                  }"
                />
              </div>
            </div>

            <!-- Simple motivational message -->
            <div
              class="text-center p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20"
            >
              <p class="text-sm font-medium text-primary">
                {{
                  Math.round(
                    (Object.values(props.formQuiz).filter(
                      (q: any) => q.selectedOption !== null,
                    ).length /
                      quiz.length) *
                      100,
                  ) < 50
                    ? "Keep going! You're doing great!"
                    : "Almost there! You've got this!"
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
