<script setup lang="ts">
import {
  AcademicCapIcon,
  BookOpenIcon,
  EyeIcon,
  LanguageIcon,
  RocketLaunchIcon,
  Square2StackIcon,
  TrophyIcon,
} from "@heroicons/vue/24/outline";

const emit = defineEmits(["tabActiveChanged"]);

const icons = {
  book: BookOpenIcon,
  language: LanguageIcon,
  rocket: RocketLaunchIcon,
  academic: AcademicCapIcon,
  eye: EyeIcon,
  trophy: TrophyIcon,
  squareTwoStack: Square2StackIcon,
};

type TabItem = {
  title: string;
  icon: string | null;
  activeBgColorClass: string;
  activeTxtColorClass: string;
};

const props = withDefaults(
  defineProps<{
    firstTab?: TabItem | null;
    secondTab?: TabItem | null;
    thirdTab?: TabItem | null;
    fourthTab?: TabItem | null;
    activatedTab?: number | null;
  }>(),
  {
    firstTab: null,
    secondTab: null,
    thirdTab: null,
    fourthTab: null,
  },
);

const tabItemActive = ref(props.activatedTab ?? 1);

const handleTabActiveChanged = (id: number) => {
  tabItemActive.value = id;
  emit("tabActiveChanged", id);
};
</script>

<template>
  <div class="flex items-center space-x-4">
    <div class="flex items-center bg-gray-100 rounded-lg p-1">
      <button
        v-if="firstTab"
        class="px-4 py-2 cursor-pointer rounded-md text-sm font-medium transition-all duration-200"
        :class="
          tabItemActive === 1
            ? props.firstTab?.activeBgColorClass
              ? `shadow-sm ${props.firstTab?.activeBgColorClass} ${props.firstTab?.activeTxtColorClass}`
              : `bg-white text-indigo-600 shadow-sm`
            : 'text-gray-600 hover:text-gray-900'
        "
        @click="handleTabActiveChanged(1)"
      >
        <div class="flex items-center space-x-2">
          <component
            :is="icons[firstTab.icon]"
            v-if="firstTab.icon"
            class="h-4 w-4"
          />
          <span>{{ firstTab.title }}</span>
        </div>
      </button>
      <button
        v-if="secondTab"
        class="px-4 py-2 cursor-pointer rounded-md text-sm font-medium transition-all duration-200"
        :class="
          tabItemActive === 2
            ? props.secondTab?.activeBgColorClass
              ? `shadow-sm ${props.secondTab?.activeBgColorClass} ${props.secondTab?.activeTxtColorClass}`
              : 'bg-white text-indigo-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        "
        @click="handleTabActiveChanged(2)"
      >
        <div class="flex items-center space-x-2">
          <component
            :is="icons[secondTab.icon]"
            v-if="secondTab.icon"
            class="h-4 w-4"
          />
          <span>{{ secondTab.title }}</span>
        </div>
      </button>
      <button
        v-if="thirdTab"
        class="px-4 py-2 cursor-pointer rounded-md text-sm font-medium transition-all duration-200"
        :class="
          tabItemActive === 3
            ? props.thirdTab?.activeBgColorClass
              ? `shadow-sm ${props.thirdTab?.activeBgColorClass} ${props.thirdTab?.activeTxtColorClass}`
              : 'bg-white text-indigo-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        "
        @click="handleTabActiveChanged(3)"
      >
        <div class="flex items-center space-x-2">
          <component
            :is="icons[thirdTab.icon]"
            v-if="thirdTab.icon"
            class="h-4 w-4"
          />
          <span>{{ thirdTab.title }}</span>
        </div>
      </button>
      <button
        v-if="fourthTab"
        class="px-4 py-2 cursor-pointer rounded-md text-sm font-medium transition-all duration-200"
        :class="
          tabItemActive === 4
            ? 'bg-white text-indigo-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        "
        @click="handleTabActiveChanged(4)"
      >
        <div class="flex items-center space-x-2">
          <component
            :is="icons[fourthTab.icon]"
            v-if="fourthTab.icon"
            class="h-4 w-4"
          />
          <span>{{ fourthTab.title }}</span>
        </div>
      </button>
    </div>
  </div>
</template>
