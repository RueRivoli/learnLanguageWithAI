<script setup lang="ts">
import { PencilSquareIcon, XMarkIcon } from "@heroicons/vue/24/outline";
const props = withDefaults(
  defineProps<{
    list: any[];
    id: string;
    title: string;
    limit: number;
  }>(),
  {
    list: [],
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
          class="h-5 w-5 mr-2 font-semibold group-hover:text-neutral"
        />
        <h3 class="text-lg font-semibold">{{ props.title }}</h3>
      </div>

      <p class="py-4 italic">
        Click on the words you know to remove them from the learning list.
        <br>
        <span>
        The words you closed will be automatically stored as known words.
        </span>
      </p>
     
      <!-- <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form> -->
      <div
        v-for="(elt, n) in listItems.slice(0, 10)"
        :key="n"
        class="btn btn-sm btn-neutral mr-2 mb-2"
      >
        {{ elt.text }}
        <XMarkIcon
          class="h-4 w-4 font-semibold group-hover:text-neutral"
          @click="handleDeleteSelectedItem(elt.text)"
        />
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
