import type {
  DehydratedState,
  VueQueryPluginOptions,
} from '@tanstack/vue-query'
// Nuxt 3 app aliases
import { defineNuxtPlugin, useState } from '#imports'
import {
  dehydrate,
  hydrate,
  QueryClient,
  VueQueryPlugin,
} from '@tanstack/vue-query'

export default defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState<DehydratedState | null>('vue-query')

  // Modify your Vue Query global settings here
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 10000 } },
  })
  const options: VueQueryPluginOptions = { queryClient }

  nuxt.vueApp.use(VueQueryPlugin, options)

  if (import.meta.server) {
    nuxt.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient)
    })
  }

  if (import.meta.client) {
    hydrate(queryClient, vueQueryState.value)
  }
})
