<script setup lang="ts">
import { EyeIcon, EyeSlashIcon, XCircleIcon } from "@heroicons/vue/24/outline";
import { getEmailPasswordInvalidityMessage } from "~/utils/auth/auth";
import type { Schema } from "~/utils/auth/auth";

const client = useSupabaseClient();
const state = reactive<Schema>({
  email: "",
  password: "",
});

const connexionError = ref<string | null>(null);
const isLoading = ref<boolean>(false);
const showPassword = ref<boolean>(false);

const handleSignIn = async () => {
  console.log("handleSignIn");
  connexionError.value = null;
  const errorFromCheck = getEmailPasswordInvalidityMessage(state);
  console.log("errorFromCheck", errorFromCheck);
  if (errorFromCheck !== null) {
    connexionError.value = errorFromCheck;
    return;
  }
  console.log("email", state, state.email, state.password);
  try {
    const { data, error } = await client.auth.signInWithPassword({
      email: state.email,
      password: state.password,
    });
    console.log("data", data);
    if (data.user?.id) {
      await navigateTo({
        path: "/learning/dashboard",
      });
    }
    if (error) throw error;
  } catch (error) {
    console.log("error", error);
    if (error.code === "email_not_confirmed") {
      connexionError.value =
        "Please confirm your email to log in.<br/> If the confirmation link has expired, sign up again";
    } else connexionError.value = "Invalid email or password";
  }
};

//TO DO: change to google
const handleSignInWithGoogle = async () => {
  console.log("handleSignInWithGoogle");
  await client.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin + "/learning/dashboard",
    },
  });
};
</script>

<template>
  <div class="flex flex-col items-center p-7">
    <div class="mx-auto w-sm">
      <div>
        <button
          type="submit"
          class="btn btn-neutral h-12 w-full focus:ring-4 focus:outline-none focus:primary font-medium rounded-lg text-sm px-5 py-2.5"
          @click="handleSignInWithGoogle"
        >
          <img
            id="provider-logo"
            loading="lazy"
            height="24"
            width="24"
            src="./../../assets/img/oauth/google.svg"
          />
          <span>Sign In With Google</span>
        </button>
      </div>
      <br />

      <div class="divider divider-neutral text-sm">OR</div>
      <br />

      <!-- <div
        v-if="connexionError"
        class="w-full bg-error mb-2 border text-white border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
      >
        {{ connexionError }}
      </div> -->
      <div
        v-if="connexionError"
        role="alert"
        class="w-full alert alert-error mb-2"
      >
        <XCircleIcon class="h-5 w-5 cursor-pointer text-white" />
        <span class="text-white" v-html="connexionError" />
      </div>
      <form :state="state" novalidate @submit.prevent="handleSignIn">
        <div class="mb-2">
          <label for="email" class="block mb-2 text-sm font-medium"
            >Your email</label
          >
          <input
            id="email"
            v-model="state.email"
            class="w-full bg-base-200 border rounded-lg focus:ring-primary p-2.5"
            placeholder="email"
            type="email"
            required
          />
        </div>
        <div class="mb-2">
          <label for="password" class="block mb-2 text-sm font-medium"
            >Your password</label
          >
          <div class="relative">
            <input
              id="password"
              v-model="state.password"
              class="w-full bg-base-200 border rounded-lg focus:border-primary p-2.5"
              placeholder="password"
              :type="showPassword ? 'text' : 'password'"
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
        <div class="underline text-primary mb-4">
          <NuxtLink to="/authorization/password-forgotten/">
            <span class="underline-offset-4 text-primary dark:text-white"
              >Password Forgotten ?</span
            >
          </NuxtLink>
        </div>
        <button
          type="submit"
          class="btn btn-primary w-full h-12 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
          :class="{ 'btn-disabled': isLoading }"
        >
          <span v-if="isLoading" class="loading loading-spinner" />
          <span>Sign In</span>
        </button>
      </form>
    </div>
  </div>
</template>
