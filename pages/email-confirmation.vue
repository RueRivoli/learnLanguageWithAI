<script setup lang="ts">
import { CheckCircleIcon } from "@heroicons/vue/24/outline";
const route = useRoute();
const client = useSupabaseClient();

definePageMeta({
  layout: "auth",
});
const resendError = ref<null | string>(null);

const handleResendEmail = async () => {
  resendError.value = null;
  if (!validateCaptcha()) {
    resendError.value =
      captchaError.value || "Please complete the captcha verification.";
    return;
  }

  if (route.query.email) {
    try {
      const signUpOptions: any = {};
      if (captchaToken.value) {
        signUpOptions.captchaToken = captchaToken.value;
      }
      const { error } = await client.auth.resend({
        type: "signup",
        email: route.query.email,
        // options: signUpOptions,
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

    // IMPORTANT: Always reset captcha after any error to prevent token reuse
    resetCaptcha();

    }
  }
};

const {
  captchaToken,
  captchaError,
  isCaptchaLoaded,
  loadHCaptcha,
  onCaptchaVerified,
  onCaptchaExpired,
  onCaptchaError,
  validateCaptcha,
  resetCaptcha,
  HCAPTCHA_SITE_KEY,
} = useHCaptcha();


const captchaContainerRef = ref<HTMLElement | null>(null);

onMounted(() => {
  loadHCaptcha();

  // Watch for script load and initialize widget
  watchEffect(() => {
    if (
      isCaptchaLoaded.value &&
      captchaContainerRef.value &&
      typeof window !== "undefined"
    ) {
      // @ts-ignore
      if (
        window.hcaptcha &&
        !captchaContainerRef.value.hasAttribute("data-rendered")
      ) {
        try {
          // @ts-ignore
          window.hcaptcha.render(captchaContainerRef.value, {
            sitekey: HCAPTCHA_SITE_KEY,
            callback: (token: string) => {
              onCaptchaVerified(token);
            },
            "expired-callback": () => {
              onCaptchaExpired();
            },
            "error-callback": () => {
              onCaptchaError();
            },
          });
          captchaContainerRef.value.setAttribute("data-rendered", "true");
        } catch (error) {
          console.error("Error rendering hCaptcha widget:", error);
        }
      }
    }
  });
});

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
            <div class="mb-4 flex flex-col items-center">
              <div v-if="!isCaptchaLoaded" class="skeleton h-16 w-64" />
              <div ref="captchaContainerRef" v-if="isCaptchaLoaded" />
              <div v-if="resendError" class="text-error text-xs mt-1">
                {{ resendError }}
              </div>
            </div>
            <button class="btn btn-ghost btn-sm" @click="handleResendEmail">
              Resend the Confirmation Mail
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
