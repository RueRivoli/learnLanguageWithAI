<script setup lang="ts">
import { getAuthToken } from '~/utils/auth/auth';

const userStore = useUserStore();
const user = useSupabaseUser();
const client = useSupabaseClient();
const loading = ref(true);
onMounted(async () => {
  console.log(
    "onMounted",
  );
  const { data } = await client.auth.getSession();
  loading.value = false;

  if (!data.session) {
    return navigateTo("/authorization/auth/?toCreateAccount=false");
  }
});

watchEffect(async () => {
  if (!userStore.$state.isLoaded && user.value) {
    const headers = await getAuthToken();
    const profile = await $fetch(`/api/profiles/${user.value.id}`, {
      method: "GET",
      headers,
    });
    console.log('profile', profile)
    // if (profile && !profile[0].language_learned) {
    //   languageSelectionModal.value?.openModal();
    // }
    if (profile && profile[0]) userStore.setProfile(profile[0]);
  }
  // else if (!user.value?.id) {
  //   console.log('ici',user.value)
  //     return navigateTo("/authorization/auth/?toCreateAccount=false");
  // }
});
</script>

<template>
  <div class="h-full min-h-screen flex flex-col">
    <div class="flex">
      <LayoutSidebar />
      <!-- Main content -->
      <main v-if="!loading" class="max-h-screen w-full bg-base-200 overflow-y-auto">
        <!-- <div class="h-10 border-b border-primary/20">
          <LayoutHeader />
        </div> -->
        <NuxtPage />
        <!-- <div class="flex justify-between"></div> -->
      </main>
    </div>
  </div>
</template>
