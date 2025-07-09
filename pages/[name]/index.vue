<script setup lang="ts">
import appConfig from '~/app.config'

const route = useRoute()
const routeName = route.params.name as string
const navItem = appConfig.appNavigation.find(item => item.link === routeName)

const { data, pending: loading, error } = useFetch(`/api/rss`, {
  query: {
    url: navItem?.dataUrl,
  },
  immediate: !!navItem?.dataUrl,
})

definePageMeta({
  validate: async (route) => {
    const routeName = route.params.name as string
    const validRoutes = appConfig.appNavigation.map(item => item.link)

    return validRoutes.includes(routeName)
  },
})
</script>

<template>
  <div>
    <UiListView :items="data?.items || []" :loading="loading" :error="error" />
  </div>
</template>

<style scoped lang="scss">
.page-title {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  font-weight: bold;
}
</style>
