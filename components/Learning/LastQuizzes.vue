<script setup lang="ts">
// import type { Quiz } from "~/types/quiz.ts";
import { formatDate } from "~/utils/date/date";
const props = withDefaults(
  defineProps<{
    loading: boolean;
    ruleName: string;
    quizs: any[];
  }>(),
  {
    loading: false,
    ruleName: null,
    quizs: [],
  },
);
</script>

<template>
  <div class="w-full">
    <div class="bg-base-100 rounded-box shadow-md p-5">
      <div
        v-if="!props.quizs"
        class="w-full h-72 flex justify-center items-center"
      >
        <span class="loading loading-bars loading-xl" />
      </div>
      <div v-else class="flex flex-col items-center justify-between">
        <!-- <h2 class="font-bold mb-3 text-xl tracking-widest text-primary">
          Last quizs on {{ ruleName }}
        </h2> -->
        <LayoutHeadingSecondary
          title=" Last quizzes on "
          :highlighted-text="ruleName"
        />
        <div class="mt-2 w-full">
          <table class="table table-zebra table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!props.quizs.length">
                <td
                  class="font-semibold"
                  align="center"
                  valign="middle"
                  colspan="3"
                >
                  no quiz done yet
                </td>
              </tr>
              <tr v-for="(quiz, n) in props.quizs" v-else :key="n">
                <td>
                  <div class="font-bold">#{{ quiz.id }}</div>
                </td>
                <td>
                  <div class="font-bold">
                    {{ formatDate(quiz.createdAt) }}
                  </div>
                </td>
                <td>
                  <ScoreRating :score="quiz.score" type="rating" />

                  <!-- <div
                    class="radial-progress"
                    style="--value: 70; --size:2.5rem;"
                    aria-valuenow="70"
                    role="progressbar"
                  >
                    70%
                  </div> -->

                  <!-- <div class="flex items-center">
                    <progress
                      class="progress w-56"
                      :class="getProgressBarStyleClass(fakeProgressBar(n))"
                      :value="fakeProgressBar(n)"
                      max="100"
                    />
                    <div
                      class="ml-2 font-bold"
                      :class="getPercentageStyleClass(fakeProgressBar(n))"
                    >
                      {{ fakeProgressBar(n) }}%
                    </div>
                  </div> -->
                </td>
                <td>
                  <button
                    class="btn btn-ghost"
                    @click="router.push(`/learning/quiz/${quiz.id}`)"
                  >
                    <EyeIcon
                      class="h-5 w-5 font-bold text-black dark:text-white group-hover:text-white"
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- grid-template-columns: [card] 80% [gap] 3% [additional] 17% -->
