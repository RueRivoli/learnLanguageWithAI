<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";
definePageMeta({
  layout: "auth",
});
const client = useSupabaseClient();
const state = ref({ email: "" });

const passwordForgottenError = ref<string | null>(null);
const isLoading = ref<boolean>(false);

const handleResetPassword = async () => {
  passwordForgottenError.value = null;
  // Test if email correct
  try {
    if (state.value.email) {
      isLoading.value = true;
      const { data, error } = await client.auth.resetPasswordForEmail(
        state.value.email,
        {
          redirectTo: window.location.origin + "/authorization/reset-password/",
        },
      );
      isLoading.value = false;
      if (error) throw error;
    }
  } catch (error) {
    passwordForgottenError.value = error;
  }
};
</script>

<template>
  <div
    class="bg-neutral/10 h-full pt-[4rem] flex justify-center items-center"
  >
    <div>
      <div class="flex justify-start mb-4">
        <NuxtLink
            class="flex items-center px-3 py-1.5 btn btn-ghost btn-sm group"
            :to="{
            path: '/authorization/auth/',
            query: { toCreateAccount: 'false' },
          }"
          >
            <ArrowLeftIcon class="h-5 w-5" />
            <span class="ml-1">Back To Login</span>
          </NuxtLink>
      </div>
      <div class="mx-auto flex flex-col items-center">
        <div class="mx-auto w-sm">
            <label class="label text-neutral mb-2 text-xl">
              <span>Reset Your Password</span>
            </label>
          <div
            v-if="passwordForgottenError"
            class="w-full bg-error mb-2 border text-white border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
            {{ passwordForgottenError }}
          </div>
          <form :state="state" @submit.prevent="handleResetPassword">
            <div class="mb-4">
              <label for="email" class="block mb-2 text-sm font-medium"
                >Email</label
              >
              <input
                id="email"
                v-model="state.email"
                class="w-full bg-base-200 border rounded-lg focus:ring-primary p-2.5"
                placeholder="email"
                required
              />
            </div>
            <button
              type="submit"
              class="btn btn-primary w-full h-12 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              :class="{ 'btn-disabled': isLoading }"
              @click="handleResetPassword"
            >
              <span v-if="isLoading" class="loading loading-spinner" />
              <span>Reset Your Password</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
