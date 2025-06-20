<script setup lang="ts">
const userStore = useUserStore();
const user = useSupabaseUser();
watchEffect(async () => {
  console.log("watchEffect");
  if (!userStore.$state.isLoaded && user.value?.id) {
    console.log("userStore is not loaded, we fetch profile again");
    const profile = await $fetch(`/api/profiles/${user.value.id}`, {
      method: "GET",
    });
    // if (profile && !profile[0].language_learned) {
    //   languageSelectionModal.value?.openModal();
    // }
    userStore.setProfile(profile[0]);
  }
});
</script>

<template>
  <div class="h-full min-h-screen flex flex-col">
    <div class="flex">
      <LayoutSidebar />
      <!-- Main content -->
      <main class="max-h-screen p-4 w-full bg-base-200">
        <!-- <div class="h-10 border-b border-primary/20">
          <LayoutHeader />
        </div> -->
        <NuxtPage />
        <!-- <div class="flex justify-between"></div> -->
      </main>
    </div>
  </div>
</template>
