<script setup lang="ts">
import {
  ArrowRightCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/vue/24/outline";
const route = useRoute();
const client = useSupabaseClient();
const messageError = ref<string | null>(route.query.error);
const messageErrorCode = ref<string | null>(route.query.error_code);
const messageCode = ref<string | null>(route.query.code);
const isEmailAlreadyVerified = ref<string | null>(
  route.query.emailVerified === "true",
);
const resendConfirmationMailError = ref(null);

const handleConfirmationMailResend = async () => {
  console.log("handleConfirmationMailResend", route.query.email);
  if (route.query.email) {
    const { error } = await client.auth.resend({
      type: "signup",
      email: route.query.email,
      options: {
        redirectTo:
          window.location.origin + "/authorization/confirmation-account",
      },
    });
    if (error) resendConfirmationMailError.value = error;
  }
};
</script>

<template>
  <div class="h-[calc(100vh-4rem)] space-y-12 flex justify-center items-center">
    <div class="w-full flex flex-col justify-center items-center">
      <div v-if="route.query.error" role="alert" class="alert alert-error">
        <XCircleIcon class="h-5 w-5 text-neutral group-hover:text-indigo-800" />

        <div
          v-if="route.query.error === 'access_denied'"
          class="flex flex-col items-center"
        >
          <div class="mb-2">The link has expired or is invalid!</div>
          <button
            class="inline-flex items-center justify-center text-primary cursor-pointer text-sm font-semibold tracking-wide transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            type="button"
            @click="handleConfirmationMailResend"
          >
            Resend confirmation mail
          </button>
        </div>
        <span v-else>{{ route.query.error }}!</span>
      </div>
      <div v-if="isEmailAlreadyVerified">
        <div class="flex flex-col items-center">
          <img
            alt="LinguaLab Logo"
            class="h-50 w-auto"
            src="~/assets/img/translogomail.png"
          />
          <div role="alert" class="alert alert-success">
            <CheckCircleIcon
              class="h-5 w-5 mr-2 text-neutral group-hover:text-indigo-800"
            />
            <span>Your account is already activated !</span>
          </div>
        </div>
        <div>
          <NuxtLink
            class="flex items-center px-3 py-1.5 btn btn-secondary btn-sm group"
            to="/learning/dashboard"
          >
            <ArrowRightCircleIcon class="h-5 w-5" />
            <span class="ml-2">Access the application here</span>
          </NuxtLink>
        </div>
      </div>
      <div class="p-5" v-else-if="messageCode">
        <div class="flex flex-col justify-between items-center">
          <img
            alt="LinguaLab Logo"
            class="h-30 w-auto"
            src="~/assets/img/translogomail.png"
          />
          <div role="alert" class="alert alert-success alert-soft">
            <CheckCircleIcon class="h-5 w-5 group-hover:text-indigo-800" />
            <div>
              <h3 class="font-bold">Your account has been activated</h3>
              <div class="text-xs">You can start to learn</div>
            </div>
            <!-- <button class="btn btn-sm btn-warning">
              <ArrowRightCircleIcon class="h-5 w-5" />
              <span class="ml-2">Start here</span>
            </button> -->
            <NuxtLink
              class="flex items-center px-3 py-1.5 btn btn-warning btn-sm group"
              to="/learning/dashboard"
            >
              <ArrowRightCircleIcon class="h-5 w-5" />
              <span class="ml-2">Start here</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
