<script setup lang="ts">
import { ChartBarIcon } from "@heroicons/vue/24/outline";
import { useUserStore } from "~/stores/user-store";

definePageMeta({
  layout: "authenticated",
});

const user = useSupabaseUser();
const client = useSupabaseClient();
const userStore = useUserStore();
const languageSelectionModal = ref(null);
const pseudoDefinitionModal = ref(null);

watchEffect(async () => {
  if (user.value) {
    const userId = user.value.id;
    try {
      const profile = await $fetch(`/api/profiles/${userId}`, {
        method: "GET",
      });
      if (profile && !profile[0].language_learned) {
        languageSelectionModal.value?.openModal();
        userStore.setProfile(profile);
      }
    } catch (error) {
      console.log(error);
    }
  }
});

const handleProfileUpdated = () => {
  pseudoDefinitionModal.value.openModal();
};
const getInfoUser = async () => {
  const {
    data: { user },
  } = await client.auth.getUser();
};

getInfoUser();
</script>

<template>
  <div class="w-full grid grid-cols-4 gap-2">
    <div class="col-span-3">
      <div class="list bg-white rounded-box shadow-md">
        <div class="p-5">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <ChartBarIcon
                class="h-5 w-5 mr-2 text-neutral group-hover:text-indigo-800"
              />
              <LayoutHeadingPlus title="Dashboard" />
            </div>
          </div>
        </div>
        <div class="p-3">Metrics on grammar rules</div>
        <div class="p-3">Vocabulary statistics</div>
      </div>
    </div>

    <div class="col-span-1 flex flex-col grow-1 border-l border-zinc-950/5">
      side panel
    </div>
    <AccountSelectionLanguageModal
      ref="languageSelectionModal"
      :user-id="user?.id"
      @language-updated="handleProfileUpdated"
    />
    <AccountPseudoDefinitionModal
      ref="pseudoDefinitionModal"
      :user-id="user?.id"
      :full-name="user?.user_metadata.full_name"
    />
  </div>
</template>
