<script setup lang="ts">
import { computed } from 'vue'

type PageIdentifier = number | string
type PageArray = PageIdentifier[]

interface PaginatorProps {
  total: number
  perPage?: number
  maxVisiblePages?: number
}

const props = withDefaults(defineProps<PaginatorProps>(), {
  perPage: 10,
  maxVisiblePages: 5,
})

const emit = defineEmits<{
  'update:page': [page: number]
}>()

const modelValue = defineModel<number>('page', {
  default: 1,
})

const totalPages = computed(() => Math.ceil(props.total / props.perPage))

const pageNumbers = computed<PageArray>(() => {
  const pages: PageArray = [1]

  if (totalPages.value <= 1) {
    return pages
  }

  const maxVisible = Math.min(props.maxVisiblePages, totalPages.value)
  const adjustedMaxVisible = maxVisible - 2

  let startPage = Math.max(2, modelValue.value - Math.floor(adjustedMaxVisible / 2))
  const endPage = Math.min(totalPages.value - 1, startPage + adjustedMaxVisible - 1)

  if (endPage - startPage < adjustedMaxVisible - 1) {
    startPage = Math.max(2, endPage - (adjustedMaxVisible - 1) + 1)
  }

  if (startPage > 2) {
    pages.push('...')
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  if (endPage < totalPages.value - 1) {
    pages.push('...')
  }

  if (totalPages.value > 1) {
    pages.push(totalPages.value)
  }

  return pages
})

function changePage(page: PageIdentifier): void {
  if (page === '...' || typeof page !== 'number' || page < 1 || page > totalPages.value) {
    return
  }

  modelValue.value = page
  emit('update:page', page)
}
</script>

<template>
  <div v-if="totalPages > 0" class="paginator">
    <button
      v-for="page in pageNumbers"
      :key="page"
      class="paginator__btn"
      :class="{ 'paginator__btn--active': page === modelValue, 'paginator__btn--ellipsis': page === '...' }"
      :disabled="page === '...'"
      @click="changePage(page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<style scoped lang="scss">
.paginator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &--active {
      color: var(--primary-color);
    }
  }
}
</style>
