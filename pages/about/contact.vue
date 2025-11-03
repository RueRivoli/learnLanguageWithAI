<script setup lang="ts">
import { XCircleIcon, PaperAirplaneIcon } from "@heroicons/vue/24/outline";

definePageMeta({
  layout: "default",
});

const state = reactive({
  subject: "",
  email: "",
  message: "",
});

const isSubmitting = ref(false);
const error = ref<string | null>(null);
const success = ref<boolean>(false);

const validateForm = () => {
  if (!state.subject.trim()) {
    error.value = "Subject is required";
    return false;
  }
  if (!state.email.trim()) {
    error.value = "Email is required";
    return false;
  }
  if (!state.message.trim()) {
    error.value = "Message is required";
    return false;
  }
  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(state.email)) {
    error.value = "Please enter a valid email address";
    return false;
  }
  return true;
};

const handleSubmit = async () => {
  error.value = null;
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;

  try {
    // TODO: Implement the actual API call to send the email
    // For now, simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    success.value = true;

    // Reset form
    setTimeout(() => {
      state.subject = "";
      state.email = "";
      state.message = "";
      success.value = false;
    }, 3000);
  } catch (err) {
    error.value = "Failed to send message. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col grow items-center p-7">
    <div class="mx-auto w-full max-w-2xl mt-10">
      <h1 class="text-3xl font-bold text-base-content mb-2">Contact Us</h1>
      <p class="text-base-content/60 mb-8">
        Get in touch with us. We'll respond as soon as possible.
      </p>

      <!-- Success Message -->
      <div v-if="success" role="alert" class="alert alert-success mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Message sent successfully! We'll get back to you soon.</span>
      </div>

      <!-- Error Message -->
      <div v-if="error" role="alert" class="alert alert-error mb-6">
        <XCircleIcon class="h-5 w-5" />
        <span>{{ error }}</span>
      </div>

      <!-- Contact Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Subject Field -->
        <div>
          <label
            for="subject"
            class="block mb-2 text-sm font-medium text-base-content"
          >
            Subject *
          </label>
          <input
            id="subject"
            v-model="state.subject"
            type="text"
            placeholder="What is this regarding?"
            class="w-full input input-bordered bg-base-200 focus:border-primary focus:outline-none"
            :disabled="isSubmitting"
          />
        </div>

        <!-- Email Field -->
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-base-content"
          >
            Email *
          </label>
          <input
            id="email"
            v-model="state.email"
            type="email"
            placeholder="your.email@example.com"
            class="w-full input input-bordered bg-base-200 focus:border-primary focus:outline-none"
            :disabled="isSubmitting"
          />
        </div>

        <!-- Message Field -->
        <div>
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-base-content"
          >
            Message *
          </label>
          <textarea
            id="message"
            v-model="state.message"
            placeholder="Tell us what you need..."
            rows="6"
            class="w-full textarea textarea-bordered bg-base-200 focus:border-primary focus:outline-none resize-none"
            :disabled="isSubmitting"
          ></textarea>
        </div>

        <!-- Send Button -->
        <button
          type="submit"
          class="btn btn-primary w-full h-12 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
          :class="{ 'btn-disabled': isSubmitting }"
        >
          <PaperAirplaneIcon v-if="!isSubmitting" class="h-5 w-5 mr-2" />
          <span v-if="isSubmitting" class="loading loading-spinner" />
          <span>{{ isSubmitting ? "Sending..." : "Send Message" }}</span>
        </button>
      </form>

      <!-- Alternative Contact -->
      <div class="mt-12 p-6 bg-base-200 rounded-lg">
        <h2 class="text-xl font-semibold text-base-content mb-4">
          Alternative Ways to Reach Us
        </h2>
        <p class="text-base-content/70">
          You can also contact us directly at
          <a
            href="mailto:contact@tookanai.com"
            class="text-primary hover:underline"
          >
            contact@tookanai.com
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
