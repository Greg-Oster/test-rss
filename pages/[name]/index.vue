<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import appConfig from '~/app.config'

const route = useRoute()
const routeName = route.params.name as string
const navItem = appConfig.appNavigation.find(item => item.link === routeName)

async function fetchRssData() {
  if (!navItem?.dataUrl)
    return null

  return $fetch('/api/rss', {
    query: { url: navItem.dataUrl },
  })
}

const { data, isLoading: loading, error, suspense } = useQuery({
  queryKey: ['rss', navItem?.dataUrl], // Уникальный ключ для кеширования
  queryFn: fetchRssData,
  enabled: !!navItem?.dataUrl,
})

onServerPrefetch(async () => {
  await suspense()
})

definePageMeta({
  validate: async (route) => {
    const routeName = route.params.name as string
    const validRoutes = appConfig.appNavigation.map(item => item.link)

    return validRoutes.includes(routeName)
  },
})

const searchQuery = computed(() => route.query.search?.toString().toLowerCase() || '')

const filteredItems = computed(() => {
  const items = data.value?.items || []
  if (!searchQuery.value)
    return items

  return items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.value)
    || (item.description && item.description.toLowerCase().includes(searchQuery.value)),
  )
})
</script>

<template>
  <UiListView :items="filteredItems" :loading="loading" :error="error" />
</template>

<style scoped lang="scss">
.page-title {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  font-weight: bold;
}
</style>
