<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <div class="container default-layout">
    <UiFilterView class="heading" />
    <AppNavigation :links="appConfig.appNavigation" class="list-navigation">
      <UiListModeSwitcher />
    </AppNavigation>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;
  padding-bottom: pacing(7);
  padding-top: pacing(7);

  .heading {
    display: flex;
    padding-bottom: pacing(7);
    margin-bottom: pacing(5);
    border-bottom: 1px solid var(--color-secondary);

    @include max-width(){
      padding-bottom: pacing(4);
      margin-bottom: pacing(4);
    }
  }

  .list-navigation {
    margin-bottom: pacing(5);

    @include max-width(){
      margin-bottom: pacing(4);
    }
  }
}
</style>
