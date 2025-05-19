<script setup lang="ts">
useHead({
  htmlAttrs: {
    "data-theme": "light",
    class: "light",
  },
});
onMounted(() => {
  const selectedTheme = localStorage.getItem("theme");
  console.log("LocalStorage value:", selectedTheme);
  if (selectedTheme) {
    useHead({
      bodyAttrs: {
        "data-theme": selectedTheme,
        class: selectedTheme,
      },
    });
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    console.log(
      "window",
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    );
    useHead({
      bodyAttrs: {
        "data-theme": "light",
        class: "light",
      },
    });
  }
});
// document.body.classList.add('light')
// const selectedTheme = nuxtStorage.localStorage.getItem("theme");
// if (selectedTheme)
//   useHead({
//     bodyAttrs: {
//       "data-theme": selectedTheme,
//       class: selectedTheme,
//     },
//   });
// else if (window.matchMedia("(prefers-color-scheme: dark)").matches)
//   useHead({
//     bodyAttrs: {
//       "data-theme": "dark",
//       class: "dark",
//     },
//   });
</script>

<template>
  <div class="h-full">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@custom-variant light (&:where([data-theme=light], [data-theme=light] *));
/*@custom-variant dark (&:where(.light, .light *)); */
/* @custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *)); */
</style>
