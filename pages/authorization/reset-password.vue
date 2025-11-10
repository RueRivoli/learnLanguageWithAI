<script setup lang="ts">
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";

definePageMeta({
  layout: "auth",
});
const client = useSupabaseClient();
const state = ref({ password: "", confirmedPassword: "" });

const resetPasswordError = ref<string | null>(null);
const isLoading = ref<boolean>(false);
const showPassword = ref<boolean>(false);
const showConfirmPassword = ref<boolean>(false);

const handleResetPassword = async () => {
  resetPasswordError.value = null;
  isLoading.value = true;
  try {
    const { error } = await client.auth.updateUser({
      password: state.value.password,
    });
    if (error) throw error;
  } catch (error: any) {
    resetPasswordError.value = error?.message || "An error occurred";
  }
  isLoading.value = false;
};
</script>

<template>
  <div class="bg-neutral/10 h-full pt-[4rem] flex justify-center items-center">
    <div class="mx-auto">
      <div class="flex flex-col items-center">
        <div class="mx-auto w-sm">
          <div>
            <label class="label text-neutral mb-2 text-xl">
              <span>Reset Your Password</span>
            </label>
          </div>
          <div
            v-if="resetPasswordError"
            class="w-full bg-error mb-2 border text-white border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
            {{ resetPasswordError }}
          </div>
          <form :state="state" @submit.prevent="handleResetPassword">
            <div class="mb-2">
              <label for="password" class="block mb-2 text-sm font-medium"
                >New password</label
              >
              <div class="relative">
                <input
                  v-model="state.password"
                  class="w-full bg-base-200 border rounded-lg focus:ring-primary p-2.5 pr-10"
                  placeholder="new-password"
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
                    class="h-5 w-5 text-gray-500 hover:text-gray-700"
                  />
                  <EyeSlashIcon
                    v-else
                    class="h-5 w-5 text-gray-500 hover:text-gray-700"
                  />
                </button>
              </div>
            </div>
            <div class="mb-4">
              <label for="password" class="block mb-2 text-sm font-medium"
                >Confirm the password</label
              >
              <div class="relative">
                <input
                  v-model="state.confirmedPassword"
                  class="w-full bg-base-200 border rounded-lg focus:ring-primary p-2.5 pr-10"
                  placeholder="confirm-password"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  required
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-0 flex items-center pr-3"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <EyeIcon
                    v-if="showConfirmPassword"
                    class="h-5 w-5 text-gray-500 hover:text-gray-700"
                  />
                  <EyeSlashIcon
                    v-else
                    class="h-5 w-5 text-gray-500 hover:text-gray-700"
                  />
                </button>
              </div>
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
