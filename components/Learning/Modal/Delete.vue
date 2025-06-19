<script setup lang="ts">
const emit = defineEmits(["cancel", "delete"]);
const props = withDefaults(
  defineProps<{
    objectId: string | null;
    objectName: string | null;
    objectTitle: string | null;
    isLoading: boolean | null;
  }>(),
  {
    isLoading: false,
    objectId: null,
    objectName: null,
    objectTitle: null,
  },
);
</script>
<template>
  <dialog
    :id="`deletion_modal_${props.objectId}`"
    :open="props.objectId !== null"
    class="modal"
  >
    <div class="modal-box">
      <h3 class="text-lg font-bold">Confirmation</h3>
      <p class="py-4">
        Are you sure to delete the {{ props.objectName }}
        <span class="font-bold"> "{{ props.objectTitle }}" ?</span>
      </p>
      <div class="flex items-center justify-end">
        <button class="btn btn-sm mr-2 btn-secondary" @click="emit('cancel')">
          <span>Cancel</span>
        </button>
        <button
          class="btn btn-sm btn-primary"
          @click="$emit('delete', props.objectId)"
        >
          <span v-if="props.isLoading" class="loading loading-spinner" />
          <span>Confirm</span>
        </button>
      </div>
    </div>
  </dialog>
</template>

<style scoped></style>
