<script setup lang="ts">
import { useUiStore } from '~/stores/ui'

const uiStore = useUiStore()
</script>

<template>
  <div class="mode-switcher">
    <Icon
      name="icon-list"
      class="mode-switcher__icon"
      :class="{ 'mode-switcher__icon--active': uiStore.isListView }"
      @click="uiStore.setListView()"
    />
    <Icon
      name="icon-tile"
      class="mode-switcher__icon"
      :class="{ 'mode-switcher__icon--active': uiStore.isTileView }"
      @click="uiStore.setTileView()"
    />
  </div>
</template>

<style scoped lang="scss">
.mode-switcher {
  display: flex;
  gap: 1rem;

  &__icon {
    cursor: pointer;
    fill: var(--color-secondary);
    transition: fill .3s;

    &:hover {
      fill: var(--color-primary);
    }

    &--active {
      fill: var(--color-primary);
    }
  }
}
</style>
