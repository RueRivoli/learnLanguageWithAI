<script setup lang="ts">
// import { ref } from "vue";

// defineProps<{}>();
</script>

<template>
  <footer
    class="w-full text-center footer sm:footer-horizontal bg-primary text-neutral-content p-10"
  >
    <div>
      <LayoutLogo />
    </div>

    <nav>
      <h6 class="footer-title">The platform</h6>
      <a class="link link-hover">Blog</a>
      <NuxtLink to="/#how-it-works">
        <div class="link link-hover">How does it work ?</div>
      </NuxtLink>
      <NuxtLink to="/marketing/supported-languages">
        <div class="link link-hover">Languages supported</div>
      </NuxtLink>
      <NuxtLink to="/marketing/supported-languages#unsupported-languages">
        <div class="link link-hover">Request a language</div>
      </NuxtLink>
    </nav>
    <nav>
      <h6 class="footer-title">About</h6>
      <NuxtLink to="/about/contact">
        <div class="link link-hover">Policy</div>
      </NuxtLink>
      <NuxtLink to="/about/contact">
        <div class="link link-hover">Contact Us</div>
      </NuxtLink>
    </nav>
  </footer>
</template>
