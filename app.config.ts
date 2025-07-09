// app.config.ts
// import { defineAppConfig } from 'nuxt/app'

export default defineAppConfig({
  icon: {
    size: '18px', // default <Icon> size applied
    class: 'icon', // default <Icon> class applied
    mode: 'svg', // default <Icon> mode applied
    aliases: {
      nuxt: 'logos:nuxt-icon',
    },
    cssLayer: 'base', // set the css layer to inject to
  },
  appNavigation: [
    { label: 'Все', link: '/' },
    { label: 'Мос.ру', link: 'mosru' },
    { label: 'Лента.ру', link: 'lenta' },
  ],
})
