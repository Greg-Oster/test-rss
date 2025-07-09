import { formatDate } from '~/utils/dateFormat'

export default defineEventHandler(async (event) => {
  try {
    // Get the URL
    const query = getQuery(event)
    const urlParam = query.url

    if (!urlParam) {
      throw createError({
        statusCode: 400,
        message: 'URL parameter is required',
      })
    }

    // Handle both single URL and array of URLs
    const urls = Array.isArray(urlParam) ? urlParam : [urlParam as string]

    // Single URL
    const processUrl = async (url: string) => {
      try {
        // Fetch the RSS feed
        const response = await fetch(url)

        if (!response.ok) {
          console.error(`Failed to fetch RSS feed from ${url}: ${response.statusText}`)
          return [] // Return empty array for this URL
        }

        const text = await response.text()
        const items = []

        // Parse the XML using regex (simplified approach)
        const itemRegex = /<item>([\s\S]*?)<\/item>/g
        let match

        while ((match = itemRegex.exec(text)) !== null) {
          const itemContent = match[1]

          // Extract the required fields
          const title = extractTag(itemContent, 'title') || ''
          const link = extractTag(itemContent, 'link') || ''
          const description = extractTag(itemContent, 'description') || ''
          const pubDate = extractTag(itemContent, 'pubDate') || ''

          // Extract image from description if present
          const imageMatch = description.match(/<img[^>]+src="([^">]+)"/)
          const image = imageMatch ? imageMatch[1] : null

          // Remove the image tag from description if it was found
          let cleanDescription = description
          if (imageMatch) {
            cleanDescription = description.replace(/<img[^>]+>/g, '')
          }

          items.push({
            title,
            link,
            description: cleanDescription,
            pubDate,
            formattedDate: formatDate(pubDate),
            image,
          })
        }

        return items
      }
      catch (err) {
        console.error(`Error processing URL ${url}:`, err)
        return [] // Return empty array in case of error
      }
    }

    // Multiple URLs
    const itemsArrays = await Promise.all(urls.map(url => processUrl(url)))

    const allItems = itemsArrays.flat()

    // Sort by date
    allItems.sort((a, b) => {
      return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    })

    return {
      items: allItems,
    }
  }
  catch (error) {
    console.error('Error in RSS API:', error)
    throw createError({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    })
  }
})

// Helper function to extract tag content
function extractTag(content: string, tag: string): string | null {
  const regex = new RegExp(`<${tag}>(.*?)<\/${tag}>`, 's')
  const match = content.match(regex)
  if (!match) return null

  // Remove CDATA tags
  let extractedContent = match[1].trim()
  extractedContent = extractedContent.replace(/<!\[CDATA\[(.*?)\]\]>/s, '$1')

  return extractedContent
}
