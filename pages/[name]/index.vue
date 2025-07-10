<script setup lang="ts">
import appConfig from '~/app.config'
import { useRssData } from '~/composables/useRssData'

const route = useRoute()
const routeName = route.params.name as string
const { filteredItems, loading, errorMessage } = useRssData(routeName)

definePageMeta({
  validate: async (route) => {
    const routeName = route.params.name as string
    const validRoutes = appConfig.appNavigation.map(item => item.link)
    return validRoutes.includes(routeName)
  },
})
</script>

<template>
  <UiListView :items="filteredItems" :loading="loading" :error="errorMessage" />
</template>

<style scoped lang="scss">
</style>
