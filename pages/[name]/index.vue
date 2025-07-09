<script setup lang="ts">
import appConfig from '~/app.config'

definePageMeta({
  validate: async (route) => {
    const routeName = route.params.name as string
    const validRoutes = appConfig.appNavigation.map(item => item.link)

    return validRoutes.includes(routeName)
  },
})
</script>

<template>
  <UiListView />
</template>

<style scoped lang="scss">

</style>
