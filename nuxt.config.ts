import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  css: ['~/assets/css/main.scss'],
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/icon',
  ],
  icon: {
    customCollections: [
      {
        prefix: 'icon',
        dir: './assets/svg',
      },
    ],
  },
})
