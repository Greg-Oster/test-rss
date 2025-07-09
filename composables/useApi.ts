interface RssItem {
  title: string
  link: string
  description: string
  pubDate: string
  formattedDate: string
}

export function useApi() {
  const data: Ref<RssItem[]> = ref([])
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)

  const fetchRss = async (url: string) => {
    loading.value = true
    error.value = null
    data.value = []

    try {
      // Call the server API endpoint instead of directly fetching the RSS feed
      const { data: result, error: fetchError } = await useFetch(`/api/rss`, {
        query: {
          url,
        },
      })

      if (fetchError.value) {
        throw new Error(`Failed to fetch RSS feed: ${fetchError.value.message}`)
      }

      if (result.value) {
        data.value = result.value.items
      }
    }
    catch (err) {
      console.error('Error fetching RSS feed:', err)
      error.value = err instanceof Error ? err.message : 'Unknown error occurred'
    }
    finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    error,
    fetchRss,
  }
}
