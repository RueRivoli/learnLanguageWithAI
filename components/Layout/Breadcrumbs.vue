<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    firstSection?: {title: string; link: string | null} | null;
    secondSection?: {title: string; link: string | null} | null;
    thirdSection?: {title: string; link: string | null} | null;
  }>(),
  {
    firstSection: null,
    secondSection: null,
    thirdSection: null,
  },
);
</script>

<template>
  <div class="breadcrumbs font-light">
    <ul>
      <li v-if="props.firstSection">
        <a :href="props.firstSection.link ?? ''">{{ props.firstSection.title }}</a>
      </li>
      <li v-if="props.secondSection">
        <a :href="props.secondSection.link ?? ''">{{ props.secondSection.title }}</a>
      </li>
      <li v-if="props.thirdSection">{{ props.thirdSection.title }}</li>
    </ul>
  </div>
</template>
