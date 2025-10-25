<script setup lang="ts">
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

watchEffect(() => {
  if (route.query.toCreateAccount === "true")
    createAccountActivated.value = true;
  else createAccountActivated.value = false;
});
</script>

<template>
  <div class="bg-neutral/10 h-[calc(100vh-4rem)] pt-[4rem] flex justify-center items-center">
    <div class="flex flex-col justify-center items-center">
      <div class="h-full flex justify-center">
        <label class="label">
          <span
            :class="{
              'text-primary font-bold': !createAccountActivated,
              'text-neutral dark:text-white': createAccountActivated,
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
