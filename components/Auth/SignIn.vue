<script setup lang="ts">
import * as z from "zod";
import { checkIfEmailPasswordCorrectFormat } from "~/utils/auth/auth";

const client = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();
const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/, {
      message:
        "Invalid password : 8 caractères min., at least one letter, one number and a special character are required",
    }),
});

type Schema = z.InferOutput<typeof schema>;

const state: Schema = reactive({
  email: "",
  password: "",
});

watchEffect(() => {
  if (user.value) {
    router.push("/account/home");
  }
});

const connexionError: null | string = ref(null);
const isLoading: boolean = ref(false);
const createAccountActivated: boolean | null = ref(false);

const testValidEmailPassword = () => {
  if (schema.safeParse(state).success) {
    console.log("email/pswd correct");
    return true;
  } else {
    if (!z.string().email().safeParse(state.email).success)
      connexionError.value = "Please input a valid email";
    else
      connexionError.value =
        "Please input a valid password: more than 8 characters, 1 number, 1 letter and 1 special character";
    return false;
  }
};

const signUp = async () => {
  connexionError.value = null;
  if (!testValidEmailPassword()) return;
  isLoading.value = true;
  try {
    const { data, error } = await client.auth.signUp({
      email: state.email,
      password: state.password,
    });
    if (error) {
      console.log("error", error);
      connexionError.value = error.message;
      throw error;
    } else if (data) {
      console.log("data", data);
    }
    isLoading.value = false;
  } catch (error) {
    console.log("error", error);
    connexionError.value = error.message;
    console.log(error);
    isLoading.value = false;
  }
};

const handleSignIn = async () => {
  connexionError.value = null;
  const errorFromCheck = checkIfEmailPasswordCorrectFormat(state);
  if (errorFromCheck !== null) {
    connexionError.value = errorFromCheck;
    return;
  }
  const { data, error } = await client.auth.signInWithPassword({
    email: state.value.email,
    password: state.value.password,
  });
  console.log("data", data);
  console.log("error", error);
};

//TO DO: change to google
const handleSignInWithGoogle = async () => {
  console.log("handleSignInWithGoogle");
  const { data, error } = await client.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: window.location.origin + "/account/home",
    },
  });
  if (data.url) {
    // redirect the user to the identity provider's authentication flow
    window.location.href = data.url;
  }
};
</script>

<template>
  <div class="flex flex-col items-center p-7">
    <div class="mx-auto w-sm">
      <div>
        <button
          type="submit"
          class="btn btn-neutral h-12 w-full focus:ring-4 focus:outline-none focus:primary font-medium rounded-lg text-sm px-5 py-2.5"
          @click="handleSignInWithGoogle"
        >
          <img
            id="provider-logo"
            loading="lazy"
            height="24"
            width="24"
            src="./../../assets/img/google.svg"
          />
          <span>Sign In With Google</span>
        </button>
      </div>
      <br />

      <div class="divider divider-neutral text-sm">OR</div>
      <br />

      <div
        v-if="connexionError"
        class="w-full bg-error mb-2 border text-white border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
      >
        {{ connexionError }}
      </div>
      <form :state="state" @submit.prevent="signUp">
        <div class="mb-5">
          <label for="email" class="block mb-2 text-sm font-medium"
            >Your email</label
          >
          <input
            id="email"
            v-model="state.email"
            type="email"
            class="w-full bg-base-200 border rounded-lg focus:ring-primary p-2.5"
            placeholder="email"
            required
          />
        </div>
        <div class="mb-5">
          <label for="password" class="block mb-2 text-sm font-medium"
            >Your password</label
          >
          <input
            id="password"
            v-model="state.password"
            type="password"
            class="w-full bg-base-200 border rounded-lg focus:border-primary p-2.5"
            placeholder="password"
            required
          />
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="btn btn-primary w-full h-12 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          @click="handleSignIn"
        >
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>
