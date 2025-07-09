<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <div class="container">
    <UiFilterView />
    <AppNavigation :links="appConfig.appNavigation">
      <UiListModeSwitcher />
    </AppNavigation>
    <slot />
  </div>
</template>

<style scoped lang="scss">

</style>
