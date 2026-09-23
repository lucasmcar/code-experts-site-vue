export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: true,
  },

  ssr: true,

  srcDir: 'app/',

  modules: ['@nuxtjs/supabase'],

  supabase: {
    redirectOptions: {
      login: '/admin/login',
      include: ['/admin(/*)?'],
    },
  },

  css: ['~/assets/styles/reset.css', '~/assets/styles/variables.css', '~/assets/styles/main.css'],

  runtimeConfig: {
    recaptchaSecretKey: '',
    supabaseServiceRoleKey: '',
    firebaseClientEmail: '',
    firebasePrivateKey: '',
    firebaseProjectId: '',

    public: {
      siteUrl: 'https://codeexpertssistemas.com.br',
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_KEY,
      recaptchaSiteKey: process.env.NUXT_PUBLIC_RECAPTCHA_SITE_KEY,
      metaPixelId: process.env.NUXT_PUBLIC_META_PIXEL_ID,
      firebaseVapidKey: process.env.NUXT_PUBLIC_FIREBASE_VAPID_KEY,
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-BR',
      },

      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          name: 'theme-color',
          content: '#ffffff',
        },
      ],

      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png',
        },
      ],
    },
  },

  nitro: {
    preset: 'netlify',
  },

  typescript: {
    strict: false,
    typeCheck: false,
  },
})
