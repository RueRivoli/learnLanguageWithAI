<script setup lang="ts">
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";

const client = useSupabaseClient();
const state = ref({ email: "" });

const passwordForgottenError = ref<string | null>(null);
const isLoading = ref<boolean>(false);

const handleResetPassword = async () => {
  passwordForgottenError.value = null;
  console.log("handlePasswordForgotten");
  // Test if email correct
  try {
    const { error } = await client.auth.resetPasswordForEmail(
      state.value.email,
      {
        redirectTo: window.location.origin + "/authorization/reset-password",
      },
    );
    if (error) throw error;
  } catch (error) {
    passwordForgottenError.value = error;
  }
};
</script>

<template>
  <div class="h-[calc(100vh-4rem)] pt-[4rem] flex justify-center items-center">
    <div class="mx-auto">
      <div class="text-primary mb-5">
        <NuxtLink
          class="flex items-center"
          :to="{
            path: '/authorization/auth/',
            query: { toCreateAccount: 'false' },
          }"
        >
          <ChevronLeftIcon class="h-5 w-5" />
          <span>Back To Login </span>
        </NuxtLink>
      </div>
      <div class="flex flex-col items-center">
        <div class="mx-auto w-sm">
          <div>
            <div class="w-full">
              <img
                alt="LinguaLab Logo"
                class="h-30 m-auto"
                src="~/assets/img/translogomail.png"
              />
            </div>
            <label class="label text-neutral mb-2 text-xl">
              <span>Reset Your Password</span>
            </label>
          </div>
          <div
            v-if="passwordForgottenError"
            class="w-full bg-error mb-2 border text-white border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
            {{ passwordForgottenError }}
          </div>
          <form :state="state" @submit.prevent="handleResetPassword">
            <div class="mb-4">
              <label for="email" class="block mb-2 text-sm font-medium"
                >Your email</label
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
              :disabled="isLoading"
              class="btn btn-primary w-full h-12 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              @click="handleResetPassword"
            >
              Reset Your Password
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
