// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  compatibilityDate: "2024-11-01",
  components: [
    {
      path: "~/components",
      pathPrefix: true,
    },
  ],
  debug: process.env.NODE_ENV === 'development',
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  echarts: {
    renderer: 'canvas',
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/devtools",
    "@nuxtjs/supabase",
    "@compodium/nuxt",
    "@unlok-co/nuxt-stripe",
    "@pinia/nuxt",
    "nuxt-echarts",
  ],
  nitro: {
    preset: 'vercel'
  },
  runtimeConfig: {
    // Variables privées (serveur uniquement)
    openaiApiKey: process.env.OPENAI_API_KEY,
    openaiApiUrl: process.env.OPENAI_API_URL,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    serviceSupabaseKey: process.env.SERVICE_SUPABASE_ANON_KEY,
    
    // Variables publiques (client) - Sécurisées par RLS
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_ANON_KEY,
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
      hCaptchaSiteKey: process.env.HCAPTCHA_SITE_KEY,
    },
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
    redirect: false,
    redirectOptions: {
      login: "/auth/auth/",
      callback: "/auth/callback",
      include: undefined,
      exclude: [],
      saveRedirectToCookie: false,
    },
    // Génération automatique des types
    typegen: {
      enabled: true,
      outputPath: 'supabase/types.ts'
    }
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
  ssr: true,
  app: {
    head: {
      link: [
        // Standard favicons
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        // Apple touch icon
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        // Android Chrome icons
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-chrome-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/android-chrome-512x512.png' },
        // Web manifest
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
  // typescript: {
  //   typeCheck: true,
  // },
});