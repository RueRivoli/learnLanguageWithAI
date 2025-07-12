<script setup lang="ts">
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
  console.log(
    "watchEffect Authenticated",
  );
  if (!userStore.$state.isLoaded && user.value) {
    console.log("userStore is not loaded, we fetch profile again");
    const profile = await $fetch(`/api/profiles/${user.value.id}`, {
      method: "GET",
    });
    // if (profile && !profile[0].language_learned) {
    //   languageSelectionModal.value?.openModal();
    // }
    userStore.setProfile(profile[0]);
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
