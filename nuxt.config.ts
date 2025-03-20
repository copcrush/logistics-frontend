export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:5000'
    }
  },

  ssr: false,
  compatibilityDate: '2025-03-17',
  modules: ['@nuxtjs/tailwindcss']
});