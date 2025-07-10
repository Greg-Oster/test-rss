<script setup lang="ts">
defineProps({
  placeholder: {
    type: String,
    default: 'Поиск',
  },
})

const emit = defineEmits(['search'])

const route = useRoute()
const router = useRouter()

const searchValue = ref(route.query.search)

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    updateSearchQuery()
  }
}

function updateSearchQuery() {
  const query = { ...route.query }
  deleteEmptySearchQuery(query)
  router.push({ query })
  emit('search', searchValue.value)
}

function deleteEmptySearchQuery(query: any) {
  if (!searchValue.value) {
    delete query.search
  }
  else {
    query.search = searchValue.value
  }
}

watch(() => route.query.search, (newVal) => {
  searchValue.value = newVal
})
</script>

<template>
  <div class="search-container">
    <input
      v-model="searchValue"
      type="text"
      class="search-input"
      :placeholder="placeholder"
      @keydown="handleKeyDown"
    >
  </div>
</template>

<style scoped lang="scss">
.search-container {
  display: flex;
  width: 250px;
}

.search-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--color-secondary);
  border-radius: var(--border-radius-md);
}
</style>
