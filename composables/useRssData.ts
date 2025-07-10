import { useQuery } from '@tanstack/vue-query'
import appConfig from '~/app.config'

interface RssData {
  items: any[]
}

export function useRssData(routePath: string) {
  const navItem = appConfig.appNavigation.find(item => item.link === routePath)

  async function fetchRssData(): Promise<RssData | null> {
    if (!navItem?.dataUrl)
      return null

    return $fetch('/api/rss', {
      query: { url: navItem.dataUrl },
    })
  }

  const { data, isLoading, error, suspense } = useQuery({
    queryKey: ['rss', navItem?.dataUrl],
    queryFn: fetchRssData,
    enabled: !!navItem?.dataUrl,
  })

  onServerPrefetch(async () => {
    await suspense()
  })

  const dataWithSource = computed(() => {
    if (!data?.value?.items)
      return []

    return data.value.items.map((item) => {
      return {
        ...item,
        source: new URL(item.link).hostname,
      }
    })
  })

  const filteredItems = useFilteredItems(dataWithSource)

  const errorMessage = computed(() => {
    if (error.value instanceof Error) {
      return error.value.message
    }
    return error.value ? String(error.value) : undefined
  })

  return {
    filteredItems,
    loading: isLoading,
    errorMessage,
  }
}
