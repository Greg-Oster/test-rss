<script setup lang="ts">
interface singleLink {
  label: string
  link: string
}
defineProps({
  links: {
    type: Array as PropType<singleLink[]>,
    required: false,
    default: () => [{ label: 'Все', link: '/' }, { label: 'test1', link: 'mosru' }, { label: 'test2', link: 'lenta' }],
  },
})
</script>

<template>
  <nav class="navigation">
    <div class="navigation__item-list">
      <template v-for="item in links" :key="item.label">
        <nuxt-link class="navigation__item" :to="item.link">
          <span>{{ item.label }}</span>
        </nuxt-link>
      </template>
    </div>

    <slot />
  </nav>
</template>

<style scoped lang="scss">
.navigation {
  display: flex;
  justify-content: space-between;

  &__item-list {
    display: flex;
    gap: 1rem;
  }
}
</style>
