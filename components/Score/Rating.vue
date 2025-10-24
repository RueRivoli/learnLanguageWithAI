<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    score: number;
    type: string;
  }>(),
  {
    score: 0,
    type: "progress",
  },
);
const starChecked = ref<number | null>(null);
const fixLastStarChecked = () => {
  if (props.score === 0) starChecked.value = 0;
  else if (props.score <= 10) starChecked.value = 1;
  else if (props.score <= 20) starChecked.value = 2;
  else if (props.score <= 30) starChecked.value = 3;
  else if (props.score <= 40) starChecked.value = 4;
  else if (props.score <= 50) starChecked.value = 5;
  else if (props.score <= 60) starChecked.value = 6;
  else if (props.score <= 70) starChecked.value = 7;
  else if (props.score <= 80) starChecked.value = 8;
  else if (props.score <= 90) starChecked.value = 9;
  else if (props.score <= 100) starChecked.value = 10;
};

watchEffect(() => {
  fixLastStarChecked();
});

// watch(
//   () => props.score,
//   (score) => {
//     if (score === 0) starChecked.value = 0;
//     else if (score <= 10) starChecked.value = 1;
//     else if (score <= 20) starChecked.value = 2;
//     else if (score <= 30) starChecked.value = 3;
//     else if (score <= 40) starChecked.value = 4;
//     else if (score <= 50) starChecked.value = 5;
//     else if (score <= 60) starChecked.value = 6;
//     else if (score <= 70) starChecked.value = 7;
//     else if (score <= 80) starChecked.value = 8;
//     else if (score <= 90) starChecked.value = 9;
//     else if (score <= 100) starChecked.value = 10;
//   },
// );
</script>

<template>
  <div class="flex items-center cursor-not-allowed">
    <div class="flex items-center rating rating-xs rating-half cursor-not-allowed">
      <input type="radio" name="rating-11" class="rating-hidden" disabled />
      <input
        type="radio"
        name="rating-11"
        class="mask mask-star-2 mask-half-1"
        aria-label="0.5 star"
        :checked="starChecked === 1 ? true : false"
        disabled
      />
      <input
        type="radio"
        name="rating-11"
        class="mask mask-star-2 mask-half-2"
        aria-label="1 star"
        :checked="starChecked === 2 ? true : false"
        disabled
      />
      <input
        type="radio"
        name="rating-11"
        class="mask mask-star-2 mask-half-1"
        aria-label="1.5 star"
        :checked="starChecked === 3 ? true : false"
        disabled
      />
      <input
        type="radio"
        name="rating-11"
        class="mask mask-star-2 mask-half-2"
        aria-label="2 star"
        :checked="starChecked === 4 ? true : false"
        disabled
      />
      <input
        type="radio"
        name="rating-11"
        class="mask mask-star-2 mask-half-1"
        aria-label="2.5 star"
        :checked="starChecked === 5 ? true : false"
        disabled
      />
      <input
        type="radio"
        name="rating-11"
        class="mask mask-star-2 mask-half-2"
        aria-label="3 star"
        :checked="starChecked === 6 ? true : false"
        disabled
      />
      <input
        type="radio"
        name="rating-11"
        class="mask mask-star-2 mask-half-1"
        aria-label="3.5 star"
        :checked="starChecked === 7 ? true : false"
        disabled
      />
      <input
        type="radio"
        name="rating-11"
        class="mask mask-star-2 mask-half-2"
        aria-label="4 star"
        :checked="starChecked === 8 ? true : false"
        disabled
      />
      <input
        type="radio"
        name="rating-11"
        class="mask mask-star-2 mask-half-1"
        aria-label="4.5 star"
        :checked="starChecked === 9 ? true : false"
        disabled
      />
      <input
        type="radio"
        name="rating-11"
        class="mask mask-star-2 mask-half-2"
        aria-label="5 star"
        :checked="starChecked === 10 ? true : false"
        disabled
      />

    </div>
    <!-- <div class="ml-2 font-bold">{{ score }}/5</div> -->
    <div class="ml-2 font-bold">3.5 / 5</div>
  </div>
</template>
