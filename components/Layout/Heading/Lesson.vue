<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string | null;
    titleEn: string | null;
    textColor?: string;
    backgroundColor?: string;
    descriptionTextColor?: string;
    storyImgUrl?: string | null;
    size?: "sm" | "md" | "lg";
  }>(),
  {
    title: null,
    titleEn: null,
    textColor: "text-neutral",
    backgroundColor: "bg-indigo-100",
    descriptionTextColor: "text-base-800",
    storyImgUrl: null,
    size: "sm",
  },
);
</script>

<template>
  <div class="flex items-center space-x-3">
    <div class="p-2 rounded-lg">
      <img
        v-if="props.storyImgUrl"
        :src="props.storyImgUrl"
        class="rounded-lg"
        :class="props.size === 'sm' ? 'w-10 h-10' : props.size === 'md' ? 'w-12 h-12' : 'w-14 h-14'"
      />
      <img
        v-else
        src="~/public/default-image.png"
        class="w-10 h-10 rounded-lg"
      />
    </div>
    <div class="hover:cursor-pointer">
      <div
        class="text-md tracking-tight font-semibold text-slate-800 tracking-wide"
      >
        {{ props.title }}
      </div>
      <div class="text-sm font-light text-slate-600">
        {{ props.titleEn }}
      </div>
    </div>
  </div>
</template>
