<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();

const handleSignOut = async () => {
  const { error } = await client.auth.signOut();
};
</script>

<template>
  <div class="h-16">
    <div class="w-full navbar shadow-sm">
      <div class="navbar-start logo">
        <NuxtLink to="/">
          <span class="ml-2">GrammIA</span>
        </NuxtLink>
      </div>
      <div class="navbar-center">
        <NuxtLink to="/working-explanation">
          <div class="cursor ml-20 mr-10">How does it work ?</div>
        </NuxtLink>
        <NuxtLink to="/supported-languages">
          <div class="cursor">Which language is supported ?</div>
        </NuxtLink>
      </div>
      <div class="navbar-end">
        <NuxtLink to="/auth">
          <span>Log In</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu open state. -->
    <div class="lg:hidden" role="dialog" aria-modal="true">
      <!-- Background backdrop, show/hide based on slide-over state. -->
      <div class="fixed inset-0 z-50" />
      <div
        class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <NuxtLink to="/">Learn Languages Fast With AI</NuxtLink>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
            <span class="sr-only">Close menu</span>
            <svg
              class="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <NuxtLink to="/working-explanation">
                <div>How does it work ?</div>
              </NuxtLink>
              <NuxtLink to="/supported-languages"
                ><div>Which language is supported ?</div></NuxtLink
              >
            </div>
            <div class="py-6">
              <NuxtLink to="/auth">
                <span class="text-xl">Log In</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  font-family: "Tagesschrift", system-ui;
  font-weight: 400;
  font-style: normal;
}
</style>
