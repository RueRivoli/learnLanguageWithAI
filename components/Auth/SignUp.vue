<script setup lang="ts">
import {
  EyeIcon,
  EyeSlashIcon,
  XCircleIcon,
} from "@heroicons/vue/24/outline";
import { getEmailPasswordInvalidityMessage } from "~/utils/auth/auth";
import type { Schema } from "~/utils/auth/auth";

const client = useSupabaseClient();
const showPassword = ref<boolean>(false);
const state = reactive<Schema>({
  email: "",
  password: "",
});

const connexionError = ref<null | string>(null);
const isLoading = ref<boolean>(false);

const handleSignUpWithGoogle = async () => {
  await client.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin + "/learning/dashboard",
    },
  });
};

const handleSignUp = async () => {
  connexionError.value = null;
  const emailOrPasswordError = getEmailPasswordInvalidityMessage(state);
  if (emailOrPasswordError !== null) {
    connexionError.value = emailOrPasswordError;
    return;
  }
  isLoading.value = true;
  try {
    const { data, error } = await client.auth.signUp({
      email: state.email,
      password: state.password,
      options: {
        emailRedirectTo:
          window.location.origin + "/authorization/confirmation-account",
      },
    });
    if (error) throw error;

    if (data?.user?.id) {
      await navigateTo({
        path: "/successful-message",
        query: {
          text: "Check your Mailbox to Confirm your Account",
        },
      });
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An error occurred";
    if (errorMessage.includes("over_email_send_rate_limit") || errorMessage.includes("rate limit exceeded")) {
      connexionError.value = "Too many signup attempts. Please wait a few minutes before trying again.";
    } else {
      connexionError.value = errorMessage;
    }
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col items-center p-7">
    <div class="mx-auto w-sm">
      <div>
        <button
          type="submit"
          class="btn btn-neutral w-full h-12 focus:ring-4 focus:outline-none focus:ring-warning font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          @click="handleSignUpWithGoogle"
        >
          <img
            id="provider-logo"
            loading="lazy"
            height="24"
            width="24"
            src="./../../assets/img/oauth/google.svg"
          />
          <span>Sign Up With Google</span>
        </button>
      </div>
      <br />
      <div class="divider divider-neutral text-sm">OR</div>
      <br />

      <div
        v-if="connexionError"
        role="alert"
        class="w-full alert alert-error mb-2"
      >
        <XCircleIcon class="h-5 w-5 cursor-pointer text-white" />
        <span class="text-white" v-html="connexionError" />
      </div>
      <form :state="state" novalidate @submit.prevent="handleSignUp">
        <div class="mb-2">
          <label for="email" class="block mb-2 text-sm font-medium"
            >Your email</label
          >
          <input
            id="email"
            v-model="state.email"
            type="email"
            class="w-full bg-base-200 border rounded-lg focus:primary focus:border-primary block p-2.5 placeholder-base-20"
            placeholder="email"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block mb-2 text-sm font-medium"
            >Your password</label
          >
          <div class="relative">
            <input
              id="password"
              v-model="state.password"
              :type="showPassword ? 'text' : 'password'"
              class="w-full bg-base-200 border rounded-lg focus:primary focus:border-primary block p-2.5 placeholder-base-20"
              placeholder="password"
              required
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 flex items-center pr-3"
              @click="showPassword = !showPassword"
            >
              <EyeIcon
                v-if="showPassword"
                class="h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-700"
              />
              <EyeSlashIcon
                v-else
                class="h-5 w-5 cursor-pointer text-gray-500 hover:text-gray-700"
              />
            </button>
          </div>
        </div>
        <!-- Remember Me Feature -->
        <!-- <div class="flex items-start mb-5">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label for="remember" class="ms-2 text-sm font-medium text-gray-900"
              >Remember me</label
            >
          </div> -->
        <button
          type="submit"
          class="btn btn-warning w-full h-12 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
          :class="{ 'btn-disabled': isLoading }"
        >
          <span v-if="isLoading" class="loading loading-spinner" />
          <span>Sign Up</span>
        </button>
      </form>
    </div>
  </div>
</template>
