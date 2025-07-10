import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { useQueryParams } from './useQueryParams'

// Sufficient only in the context of frontend filtering
export function useFilteredItems<T extends { title: string, description?: string }>(
  items: ComputedRef<T[]> | T[],
): ComputedRef<T[]> {
  const { getParam } = useQueryParams()
  const searchQuery = computed(() => getParam('search')?.toString().toLowerCase() || '')

  return computed(() => {
    // Get the actual array value based on the input type
    const itemsValue = Array.isArray(items) ? items : items.value

    if (!searchQuery.value)
      return itemsValue

    return itemsValue.filter(item =>
      item.title.toLowerCase().includes(searchQuery.value)
      || (item.description && item.description.toLowerCase().includes(searchQuery.value)),
    )
  })
}
