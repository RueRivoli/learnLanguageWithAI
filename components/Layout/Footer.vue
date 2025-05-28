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
      <a class="link link-hover">How does it work</a>
      <a class="link link-hover">Languages supported</a>
      <a class="link link-hover">Request a language</a>
    </nav>
    <nav>
      <h6 class="footer-title">About</h6>
      <a class="link link-hover">Pricing</a>
      <a class="link link-hover">Refunds & Cancellation policy</a>
      <a class="link link-hover">Contact</a>
    </nav>
  </footer>
</template>
