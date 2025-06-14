// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2024-11-01",
  components: [
    {
      path: "~/components",
      pathPrefix: true,
    },
  ],
  debug: true,
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/devtools",
    "@nuxtjs/supabase",
    "@compodium/nuxt",
    "@unlok-co/nuxt-stripe",
    "@pinia/nuxt",
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      openaiApiKey: process.env.OPENAI_API_KEY,
      openaiApiUrl: process.env.OPENAI_API_URL,
    },
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirect: false,
    redirectOptions: {
      login: "/auth/auth/",
      callback: "/learning/dashboard",
      include: undefined,
      exclude: [],
      saveRedirectToCookie: false,
    },
  },
  stripe: {
    // Server
    server: {
      key: process.env.STRIPE_SECRET_KEY,
      options: {
        // your api options override for stripe server side
        // https://github.com/stripe/stripe-node?tab=readme-ov-file#configuration
      },
      // CLIENT
    },
    client: {
      key: process.env.STRIPE_PUBLIC_KEY,
      // manualClientLoad: true, // if you want to have control where you are going to load the client
      // your api options override for stripe client side https://stripe.com/docs/js/initializing#init_stripe_js-options
      options: {},
    },
  },
  // typescript: {
  //   typeCheck: true,
  // },
});