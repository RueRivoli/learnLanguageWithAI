<script setup lang="ts">
import { ArrowPathIcon, CheckCircleIcon } from "@heroicons/vue/24/outline";
const route = useRoute();
const client = useSupabaseClient();

definePageMeta({
  layout: "auth",
});
const resendError = ref<null | string>(null);
const captchaToken = ref(route.query.captchaToken);

const handleResendEmail = async () => {
  resendError.value = null;

  if (route.query.email) {
    try {
      const signUpOptions: any = {};
      if (captchaToken.value) {
        signUpOptions.captchaToken = captchaToken.value;
      }
      const { error } = await client.auth.resend({
        type: "signup",
        email: route.query.email,
        options: {
          captchaToken: captchaToken.value,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";

    // Handle specific error types
    if (errorMessage.includes("captcha") || errorMessage.includes("CAPTCHA")) {
      resendError.value =
        "Captcha verification is required. Please complete the captcha verification.";
    }  else if (
      errorMessage.includes("timeout") ||
      errorMessage.includes("network") ||
      errorMessage.includes("connection")
    ) {
      resendError.value =
        "Connection timeout. Please check your internet connection and try again. If the problem persists, contact support.";
    } else if (
      errorMessage.includes("SMTP") ||
      errorMessage.includes("email") ||
      errorMessage.includes("send")
    ) {
      resendError.value =
        "Unable to send confirmation email. Please try again in a few minutes or contact support.";
    } else {
      resendError.value = errorMessage;
    }

    }
  }
};

</script>

<template>
  <div class="h-full space-y-12 flex justify-center items-center">
    <div class="w-full flex flex-col justify-center items-center">
      <div>
        <div class="flex flex-col gap-4 items-center">
          <div>
            <img
              alt="LinguaLab Logo"
              class="h-30 w-auto"
              src="~/assets/logo/transparent/language-lab-black.png"
            />
          </div>

          <div role="alert" class="alert alert-success text-white">
            <CheckCircleIcon class="h-5 w-5" />
            <span>Check your Mailbox to Confirm your Account</span>
          </div>
          <div class="mt-4">
            <button class="btn btn-ghost btn-sm" @click="handleResendEmail">
              <ArrowPathIcon class="h-5 w-5" />
              <span>Resend the Confirmation Mail</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
