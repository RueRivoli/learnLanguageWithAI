<script setup lang="ts">
import { PencilSquareIcon, XMarkIcon } from "@heroicons/vue/24/outline";
const props = withDefaults(
  defineProps<{
    list: any[];
    id: string;
    title: string;
    limit: number;
    type: "word" | "expression";
  }>(),
  {
    list: [],
    type: "word",
    id: "",
    title: "",
    limit: 10,
  },
);

const listItems = ref(null);

watchEffect(() => {
  console.log("watchEffect");
  listItems.value = props.list;
});

const handleDeleteSelectedItem = (text: string) => {
  listItems.value = listItems.value.filter((item) => item.text !== text);
};
</script>

<template>
  <dialog :id="props.id" class="modal">
    <div class="modal-box">
      <div class="flex items-center">
        <PencilSquareIcon
          class="h-5 w-5 mr-2 text-gray-900 group-hover:text-neutral"
        />
        <h3 class="text-xl text-gray-900">{{ props.title }}</h3>
      </div>

      <p class="pt-2 pb-4 italic">
        <!-- Add description here -->
      </p>

      <div
        class="mr-2 mb-2 flex flex-wrap gap-2"
      >
      <LayoutKeyElementWordBadge v-if="props.type === 'word'" v-for="(elt, n) in listItems.slice(0, props.limit)" :key="n" :text="elt.text">
          <template #action>
            <XMarkIcon
              class="h-4 w-4 text-white cursor-pointer font-semibold group-hover:text-neutral"
              @click="handleDeleteSelectedItem(elt.text)"
            />
          </template>
        </LayoutKeyElementWordBadge>
      <LayoutKeyElementExpressionBadge v-else-if="props.type === 'expression'" v-for="(elt, index) in listItems.slice(0, props.limit)" :key="index" :text="elt.text">
          <template #action>
            <XMarkIcon
              class="h-4 w-4 text-white cursor-pointer font-semibold group-hover:text-neutral"
              @click="handleDeleteSelectedItem(elt.text)"
            />
          </template>
        </LayoutKeyElementExpressionBadge>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn btn-sm btn-secondary" @click="$emit('cancel')">
            Cancel
          </button>
        </form>

        <button
          class="btn btn-sm btn-primary"
          @click="$emit('applySelection', listItems)"
        >
          Apply
        </button>
      </div>
    </div>
  </dialog>
</template>
