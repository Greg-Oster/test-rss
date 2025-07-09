<script setup lang="ts">
import { ref } from 'vue'
import UiListItem from '~/components/Ui/List/UiListItem.vue'
import UiListPaginator from '~/components/Ui/List/UiListPaginator.vue'

// Example state for pagination
const currentPage = ref(1)
const totalItems = ref(100)
</script>

<template>
  <div class="list">
    <div class="list__items">
      <UiListItem v-for="i in 10" :key="i" />
    </div>
    <UiListPaginator v-model:page="currentPage" :total="totalItems" class="list__paginator" />
  </div>
</template>

<style scoped lang="scss">
.list-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .list-items {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
