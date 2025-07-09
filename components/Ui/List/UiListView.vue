<script setup lang="ts">
import { computed, ref } from 'vue'
import UiListItem from '~/components/Ui/List/UiListItem.vue'
import UiListPaginator from '~/components/Ui/List/UiListPaginator.vue'

interface RssItem {
  title: string
  link: string
  description: string
  pubDate: string
  formattedDate: string
  image?: string
}

const props = defineProps({
  items: {
    type: Array as () => RssItem[],
    required: false,
    default: () => [],
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  error: {
    type: String,
    required: false,
    default: null,
  },
})

// Pagination
const currentPage = ref(1)
const itemsPerPage = 5
const totalItems = computed(() => props.items.length)

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return props.items.slice(start, end)
})
</script>

<template>
  <div class="list">
    <div v-if="loading" class="list__loading">
      Loading RSS feed...
    </div>

    <div v-else-if="error" class="list__error">
      Error: {{ error }}
    </div>

    <div v-else-if="items.length === 0" class="list__empty">
      No items found.
    </div>

    <template v-else>
      <div class="list__items">
        <UiListItem
          v-for="item in paginatedItems"
          :key="item.link"
          :title="item.title"
          :link="item.link"
          :description="item.description"
          :formatted-date="item.formattedDate"
          :source="item.source"
          :image="item.image"
        />
      </div>

      <UiListPaginator
        v-if="totalItems > itemsPerPage"
        v-model:page="currentPage"
        :total="totalItems"
        :per-page="itemsPerPage"
        class="list__paginator"
      />
    </template>
  </div>
</template>

<style scoped lang="scss">
.list {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__items {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__loading,
  &__error,
  &__empty {
    padding: 2rem;
    text-align: center;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  &__error {
    color: red;
  }
}
</style>
