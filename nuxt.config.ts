import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  css: ['~/assets/style/main.scss'],
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/icon',
    '@nuxt/image',
  ],
  icon: {
    customCollections: [
      {
        prefix: 'icon',
        dir: './assets/svg',
      },
    ],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/style/_mixins.scss" as *;',
        },
      },
    },
  },
})
