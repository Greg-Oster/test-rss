<script setup lang="ts">
defineProps({
  placeholder: {
    type: String,
    default: 'Поиск',
  },
})

const emit = defineEmits(['search'])
const { getParam, setParam } = useQueryParams()
const route = useRoute()

const searchValue = ref(getParam('search'))

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    updateSearchQuery()
  }
}

function updateSearchQuery() {
  setParam('search', searchValue.value, true)
  emit('search', searchValue.value)
}

watch(() => route.query.search, (newVal) => {
  searchValue.value = newVal
})
</script>

<template>
  <div class="filter-search">
    <input
      v-model="searchValue"
      type="text"
      class="filter-search__input"
      :placeholder="placeholder"
      @keydown="handleKeyDown"
    >
    <Icon name="icon:glass" class="filter-search__icon " @click="updateSearchQuery" />
  </div>
</template>

<style scoped lang="scss">
.filter-search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: pacing(2);
  width: 250px;
  box-shadow: var(--shadow-default);
  border-radius: var(--border-radius-md);

  @include max-width(){
    width: 100%;
  }

  &__input {
    border: none;
    flex: 1;

    &:focus {
      outline: none;
    }
  }

  &__icon {
    cursor: pointer;
  }
}
</style>
