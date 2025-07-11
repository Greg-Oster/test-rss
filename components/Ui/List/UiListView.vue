<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import appConfig from '~/app.config'
import UiListItem from '~/components/Ui/List/UiListItem.vue'
import UiListPaginator from '~/components/Ui/List/UiListPaginator.vue'
import { useUiStore } from '~/stores/ui'

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

const uiStore = useUiStore()
const route = useRoute()
const { getParam, addParam } = useQueryParams()

interface RssItem {
  title: string
  link: string
  description: string
  pubDate: string
  formattedDate: string
  image?: string
}

const itemsPerPage = appConfig.list.itemsPerPage
const totalItems = computed(() => props.items.length)

const pageParam = getParam('page')
const initialPage = Math.max(1, Number.parseInt(pageParam as string) || 1)
const currentPage = ref(initialPage)

watch(currentPage, (newPage) => {
  const maxPage = Math.ceil(totalItems.value / itemsPerPage)
  const isPageValid = newPage > 1 && newPage <= maxPage
  const isPageChanged = newPage.toString() !== getParam('page')

  if (isPageValid && isPageChanged) {
    addParam('page', newPage.toString())
  }
})

watch(totalItems, (newTotal) => {
  const maxPage = Math.ceil(newTotal / itemsPerPage)

  if (currentPage.value > maxPage && maxPage > 0) {
    currentPage.value = maxPage
  }
})

watch(() => route.query, () => {
  if (!route.query.page) {
    currentPage.value = 1
  }
}, { deep: true })

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return props.items.slice(start, end)
})
</script>

<template>
  <div class="list">
    <div v-if="loading" class="list__loading">
      Загрузка...
    </div>

    <div v-else-if="error" class="list__error">
      Ошибка: {{ error }}
    </div>

    <div v-else-if="items.length === 0" class="list__empty">
      Записей не найдено
    </div>

    <template v-else>
      <div class="list__items" :class="{ 'list__items--tile': uiStore.isTileView }">
        <UiListItem
          v-for="item in paginatedItems"
          :key="item.link"
          :title="item.title"
          :link="item.link"
          :description="item?.description"
          :formatted-date="item?.formattedDate"
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
  gap: pacing(10);

  &__items {
    display: flex;
    flex-direction: column;
    gap: pacing(4);

    &--tile {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(2, 1fr);

      @include max-width(){
        grid-template-columns: repeat(1, 1fr);
      }
    }
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
