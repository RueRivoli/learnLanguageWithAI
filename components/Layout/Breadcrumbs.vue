<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    firstSection?: string;
    secondSection?: string;
    thirdSection?: string;
  }>(),
  {
    firstSection: null,
    secondSection: null,
    thirdSection: null,
  },
);
</script>

<template>
  <div class="breadcrumbs text-sm">
    <ul>
      <li v-if="props.firstSection">
        <a>{{ props.firstSection }}</a>
      </li>
      <li v-if="props.secondSection">
        <a>{{ props.secondSection }}</a>
      </li>
      <li v-if="props.thirdSection">{{ props.thirdSection }}</li>
    </ul>
  </div>
</template>
