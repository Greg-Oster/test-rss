// app.config.ts
// import { defineAppConfig } from 'nuxt/app'

export default defineAppConfig({
  icon: {
    size: '18px', // default <Icon> size applied
    class: 'icon', // default <Icon> class applied
    mode: 'svg', // default <Icon> mode applied
    cssLayer: 'base', // set the css layer to inject to
  },
  list: {
    itemsPerPage: 6, // default number of items per page
  },
  appNavigation: [
    { label: 'Все', link: '/', dataUrl: ['https://www.mos.ru/rss', 'https://lenta.ru/rss/articles', 'https://habr.com/ru/rss/articles/'] },
    { label: 'Мос.ру', link: 'mosru', dataUrl: 'https://www.mos.ru/rss' },
    { label: 'Лента.ру', link: 'lenta', dataUrl: 'https://lenta.ru/rss' },
    { label: 'Хабр', link: 'habr', dataUrl: 'https://habr.com/ru/rss/articles/' },
  ],
})
