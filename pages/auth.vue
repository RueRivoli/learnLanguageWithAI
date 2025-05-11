<script setup lang="ts">
// const props = defineProps<{
//   toCreateAccount: boolean;
// }>({ toCreateAccount: false });

const props = withDefaults(
  defineProps<{
    toCreateAccount?: boolean;
  }>(),
  {
    toCreateAccount: false,
  }
);

const createAccountActivated: boolean | null = ref<boolean>(
  props.toCreateAccount
);
</script>

<template>
  <div class="h-[calc(100vh-4rem)] space-y-12 flex justify-center items-center">
    <div class="w-full flex flex-col justify-center items-center">
      <div class="w-full h-full flex justify-center">
        <label class="label">
          <span
            :class="{
              'text-indigo-500': !createAccountActivated,
              'text-white': createAccountActivated,
            }"
            >Sign In</span
          ><input
            v-model="createAccountActivated"
            type="checkbox"
            checked="checked"
            class="toggle toggle-xl border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
          />
          <span
            :class="{
              'text-orange-500': createAccountActivated,
              'text-white': !createAccountActivated,
            }"
            >Sign Up</span
          >
        </label>
      </div>
      <SignUp v-if="createAccountActivated" />
      <SignIn v-else />
    </div>
  </div>
</template>
