<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <div class="container default-layout">
    <UiFilterView />
    <AppNavigation :links="appConfig.appNavigation">
      <UiListModeSwitcher />
    </AppNavigation>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 40px;
  padding-top: 40px;
}
</style>
