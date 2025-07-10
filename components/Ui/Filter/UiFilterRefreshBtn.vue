<script setup lang="ts">
import { computed } from 'vue'

const emit = defineEmits(['reset'])
const route = useRoute()
const router = useRouter()

const hasQueryParams = computed(() => {
  return Object.keys(route.query).length > 0
})

function handleReset() {
  router.push({ path: route.path, query: {} })
  emit('reset')
}
</script>

<template>
  <button
    class="reset-btn"
    :class="{ active: hasQueryParams }"
    @click="handleReset"
  >
    <Icon name="icon-refresh" class="reset-btn__icon" />
  </button>
</template>

<style scoped lang="scss">
  .reset-btn {
    height: 34px;
    width: 34px;
    padding: 0.5rem;
    box-shadow: var(--shadow-default);
    border-radius: 50%;
    transition: background-color 0.3s ease;

    &.active {
      .reset-btn__icon {
        fill: var(--color-primary);
      }
    }
  }
</style>
