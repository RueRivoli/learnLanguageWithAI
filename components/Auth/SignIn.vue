<script setup lang="ts">
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
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
  connexionError.value = null;
  const errorFromCheck = getEmailPasswordInvalidityMessage(state);
  if (errorFromCheck !== null) {
    connexionError.value = errorFromCheck;
    return;
  }
  const { data, error } = await client.auth.signInWithPassword({
    email: state.value.email,
    password: state.value.password,
  });
  console.log("LOGIN: data", data, data.value);
};

//TO DO: change to google
const handleSignInWithGoogle = async () => {
  console.log("handleSignInWithGoogle");
  await client.auth.signInWithOAuth({
    provider: "github",
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
            src="./../../assets/img/google.svg"
          />
          <span>Sign In With Google</span>
        </button>
      </div>
      <br />

      <div class="divider divider-neutral text-sm">OR</div>
      <br />

      <div
        v-if="connexionError"
        class="w-full bg-error mb-2 border text-white border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
      >
        {{ connexionError }}
      </div>
      <form :state="state">
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
          :disabled="isLoading"
          class="btn btn-primary w-full h-12 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          @click="handleSignIn"
        >
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>
