<script setup>
import { ref } from "vue";
import { MinusIcon, PlusIcon } from "@heroicons/vue/24/solid";
const faqs = [
  {
    question: "How does this app work ?",
    answer:
      "This platform works with stories/lessons adapted to your level. At the end of them, you have to answer a few questions so that the programm re-evaluates your level. Then your new level is assessed and you can generate a new lesson.",
  },
  {
    question: "For which language is it working ?",
    answer:
      "This app is working with Turkish, French and Spanish. In the near future, Russian and Japanese will be supported.",
  },
  {
    question: "What level is it for ?",
    answer:
      "It can fit for any level. It's a good fit for false beginners, people who started to learn and having some trouble to make further progress.",
  },
  {
    question: "How much does it cost ?",
    answer: "The cost is 12 euros/month. 8euros/month if engaged for one year.",
  },
  {
    question: "Can I get a refund ?",
    answer:
      "If you're not satisfied with the platform, you can request a refund anytime by contacting us.",
  },
];

const openIndex = ref(null);

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index;
}
</script>

<template>
  <section class="inset-0 z-[-1] bg-cover bg-primary/40 px-4 py-12">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-4xl font-extrabold text-neutral text-center mb-10">
        Frequently Asked Questions
      </h2>
      <div class="space-y-4">
        <div
          v-for="(item, index) in faqs"
          :key="index"
          class="bg-primary/40 border border-gray-300 rounded-lg"
        >
          <button
            :id="'faq-header-' + index"
            class="w-full flex justify-between cursor-pointer items-center px-6 py-4 text-left text-lg font-semibold text-neutral hover:bg-primary/50 focus:outline-none focus-visible:ring focus-visible:ring-primary rounded-lg"
            :aria-expanded="openIndex === index"
            :aria-controls="'faq-panel-' + index"
            @click="toggle(index)"
          >
            <span>{{ item.question }}</span>
            <MinusIcon
              v-if="openIndex === index"
              class="cursor-pointer ml-2 h-5 w-5"
            />
            <PlusIcon v-else class="cursor-pointer h-5 w-5" />
          </button>
          <transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-screen"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 max-h-screen"
            leave-to-class="opacity-0 max-h-0"
          >
            <div
              v-show="openIndex === index"
              :id="'faq-panel-' + index"
              class="px-6 py-3 text-neutral prose max-w-none font-medium text-pretty"
              :aria-labelledby="'faq-header-' + index"
              role="region"
            >
              <p>{{ item.answer }}</p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Optional: smooth max-height transition for the accordion content */
[role="region"] {
  overflow: hidden;
  transition: max-height 0.3s ease;
}
</style>
