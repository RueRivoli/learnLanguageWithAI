<script setup lang="ts">
import { ChartBarIcon } from "@heroicons/vue/24/outline";
import { useUserStore } from "~/stores/user-store";
const user = useSupabaseUser();
const client = useSupabaseClient();
const userStore = useUserStore();
definePageMeta({
  layout: "authenticated",
});

watchEffect(async () => {
  if (user.value) {
    // Connexion
    console.log("USER", user.value);
    const userId = user.value.id;
    try {
      const { data, error } = await $fetch(`/api/profiles/${userId}`, {
        method: "GET",
      });
      if (error) throw error;
      if (data) userStore.setProfile(data);
    } catch (error) {
      console.log(error);
    }
  }
});

const getInfo = async () => {
  const {
    data: { user },
  } = await client.auth.getUser();
  console.log("www data", user);
};
getInfo();
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
        <div class="p-3">Metrics</div>
        <div class="p-3">Words known</div>
      </div>
    </div>

    <div class="col-span-1 flex flex-col grow-1 border-l border-zinc-950/5">
      side panel
    </div>
  </div>
</template>
