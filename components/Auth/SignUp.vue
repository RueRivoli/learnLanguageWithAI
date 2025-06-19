<script setup lang="ts">
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
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
    provider: "github",
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
    console.log("email/pswd", state.email, state.password);
    const { data, error } = await client.auth.signUp({
      email: state.email,
      password: state.password,
      options: {
        emailRedirectTo:
          window.location.origin + "/authorization/confirmation-account",
      },
    });
    if (error) throw error;
    console.log("data", data, data.value);
    console.log("error", error);
    if (data?.user?.id) {
      await navigateTo({
        path: "/successful-message",
        query: {
          text: "Please check your mailbox to confirm your account",
        },
      });
    }
  } catch (error: unknown) {
    console.log("Error From handleSignup", error);
    connexionError.value = error.message;
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
        class="bg-error mb-2 w-full border text-white border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
      >
        {{ connexionError }}
      </div>
      <form :state="state" @submit.prevent="handleSignUp">
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
          :disabled="isLoading"
          :loading="isLoading"
          class="btn btn-warning w-full h-12 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
        >
          <span>Sign Up</span>
        </button>
      </form>
    </div>
  </div>
</template>
