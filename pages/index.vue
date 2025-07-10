<script setup lang="ts">
import appConfig from '~/app.config'

const route = useRoute()
const mainPageConfig = appConfig.appNavigation.find(item => item.link === '/')
const navigationConfig = appConfig.appNavigation

const { data, pending: loading, error } = useFetch(`/api/rss`, {
  query: {
    url: mainPageConfig?.dataUrl,
  },
  immediate: !!mainPageConfig?.dataUrl,
})

function getSource() {
  if (!data?.value?.items)
    return []

  return data.value.items.map((item) => {
    const matchingNavItem = navigationConfig.find((navItem) => {
      if (navItem.link === '/' || !navItem.dataUrl)
        return false
      if (typeof navItem.dataUrl !== 'string')
        return false

      const hostname = new URL(navItem.dataUrl).hostname
      return item.link.includes(hostname)
    })

    return {
      ...item,
      source: matchingNavItem?.label || 'Unknown',
    }
  })
}

// Get search query from URL
const searchQuery = computed(() => route.query.search?.toString().toLowerCase() || '')

// Filter items based on search query
const filteredItems = computed(() => {
  const items = getSource()
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
