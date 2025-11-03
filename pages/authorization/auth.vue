<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";

const route = useRoute();
// const props = withDefaults(
//   defineProps<{
//     toCreateAccount?: boolean;
//   }>(),
//   {
//     toCreateAccount: false,
//   },
// );
const createAccountActivated = ref<boolean | null>(false);
definePageMeta({
  layout: "auth",
});

watchEffect(() => {
  if (route.query.toCreateAccount === "true")
    createAccountActivated.value = true;
  else createAccountActivated.value = false;
});
</script>

<template>
  <div
    class="grow bg-neutral/10 h-full flex flex-col justify-center items-center"
  >
    <div class="flex flex-col justify-center items-center gap-2">
      <div class="w-full px-7 flex flex-col items-center justify-center">
        <div class="flex self-start items-center mb-4">
          <NuxtLink
            class="flex items-center px-3 py-1.5 btn btn-ghost btn-sm group"
            to="/"
          >
            <ArrowLeftIcon class="h-5 w-5" />
            <span class="ml-1">Back To Home Page</span>
          </NuxtLink>
        </div>
        <label class="label">
          <span
            :class="{
              'text-primary font-bold': !createAccountActivated,
              'text-neutral': createAccountActivated,
            }"
            >Sign In</span
          ><input
            v-model="createAccountActivated"
            type="checkbox"
            checked="checked"
            class="toggle toggle-xl text-primary border-primary checked:border-warning checked:text-warning"
          />
          <span
            :class="{
              'text-warning font-bold': createAccountActivated,
              'text-neutral': !createAccountActivated,
            }"
            >Sign Up</span
          >
        </label>
      </div>
      <AuthSignUp v-if="createAccountActivated" />
      <AuthSignIn v-else />
    </div>
  </div>
</template>
