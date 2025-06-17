<script setup lang="ts">
const emit = defineEmits(["pseudoUpdated"]);
const props = withDefaults(
  defineProps<{
    userId: any;
    fullName: string;
  }>(),
  {
    userId: null,
    fullName: null,
  },
);

const pseudo = ref(props.fullName);
const pseudoDefinitionModal = ref(null);
const isSavingPseudo = ref(false);

const handleDefinePseudo = async () => {
  isSavingPseudo.value = true;
  const profile = await $fetch(`/api/profiles/${props.userId}`, {
    method: "PUT",
    body: {
      pseudo: pseudo.value,
    },
  });
  console.log("profile", profile[0]);
  // emit('pseudoUpdated', profile[0])
  isSavingPseudo.value = false;
};

const openModal = () => {
  pseudoDefinitionModal.value?.showModal();
};

defineExpose({
  openModal,
});
</script>

<template>
  <dialog ref="pseudoDefinitionModal" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold">How should we call you ?</h3>

      <div class="flex flex-wrap space-x-3 mb-8 py-6">
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Choose a nice pseudo</legend>
          <input v-model="pseudo" type="text" class="input input-primary" />
        </fieldset>
      </div>
      <div class="modal-action justify-start">
        <form method="dialog">
          <button
            :class="['mb-4 btn btn-primary', !pseudo ? 'btn-disabled' : '']"
            @click="handleDefinePseudo"
          >
            <span v-if="isSavingPseudo" class="loading loading-spinner" />
            <span>Save</span>
          </button>
        </form>
      </div>
    </div>
  </dialog>
</template>
