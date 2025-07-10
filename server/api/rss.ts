import { formatDate } from '~/utils/dateFormat'

export default defineEventHandler(async (event) => {
  try {
    // Get the URL
    const query = getQuery(event)
    const urlParam = query.url

    if (!urlParam) {
      return createError({
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
          return []
        }

        const text = await response.text()
        const items = []

        // Parse the XML using regex (simplified approach)
        // Find all item tags in the XML
        const itemRegex = /<item>([\s\S]*?)<\/item>/g

        // Get all matches at once instead of using exec in a loop
        const allMatches = text.match(itemRegex) || []

        // Process each match
        for (const matchText of allMatches) {
          // Extract the content between item tags
          const itemContent = matchText.replace(/<item>([\s\S]*?)<\/item>/, '$1')

          // Extract the required fields
          const title = extractTag(itemContent, 'title') || ''
          const link = extractTag(itemContent, 'link') || ''
          const description = extractTag(itemContent, 'description') || ''
          const pubDate = extractTag(itemContent, 'pubDate') || ''

          // Extract image from description if present
          const imageMatch = description.match(/<img[^>]+src="([^">]+)"/)

          // Extract image from enclosure tag if present (used by Lenta.ru and others)
          const enclosureMatch = itemContent.match(/<enclosure[^>]+url="([^">]+)"[^>]*>/)

          // Use image from description or enclosure, prioritizing description
          const image = imageMatch ? imageMatch[1] : (enclosureMatch ? enclosureMatch[1] : null)

          // Remove the image tag from description if it was found
          let cleanDescription = description
          if (imageMatch) {
            cleanDescription = description.replace(/<img[^>]+>/g, '')
          }

          // Safely trim HTML description to 255 characters
          cleanDescription = safelyTrimHtml(cleanDescription, 255)

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

// TODO: extract to utils?
function extractTag(content: string, tag: string): string | null {
  const regex = new RegExp(`<${tag}>(.*?)<\/${tag}>`, 's')
  const match = content.match(regex)
  if (!match)
    return null

  // Remove CDATA tags
  let extractedContent = match[1].trim()
  extractedContent = extractedContent.replace(/<!\[CDATA\[(.*?)\]\]>/s, '$1')

  return extractedContent
}

// TODO: extract to utils?
function safelyTrimHtml(html: string, maxLength: number): string {
  if (!html || html.length <= maxLength)
    return html

  // Simple case: if there are no HTML tags, do a simple trim
  if (!/<[^>]+>/.test(html)) {
    return html.length > maxLength ? `${html.substring(0, maxLength)}...` : html
  }

  // List of void elements that don't need closing tags
  const voidElements = new Set([
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
  ])

  // For HTML content, we need to be more careful
  let result = ''
  let textLength = 0
  let inTag = false
  let inEntity = false
  let entityBuffer = ''
  const openTags: string[] = []
  let currentTag = ''

  // Process the HTML character by character
  for (let i = 0; i < html.length && textLength < maxLength; i++) {
    const char = html[i]

    // Handle HTML tags
    if (char === '<') {
      inTag = true
      currentTag = ''
      result += char
      continue
    }

    if (inTag) {
      result += char
      currentTag += char

      // Check if it's a closing tag
      if (char === '/' && currentTag.length === 1) {
        // This is a closing tag, we'll handle it when we reach '>'
      }
      // Check if it's a self-closing tag
      else if (char === '>' && currentTag.endsWith('/>')) {
        inTag = false
      }
      // End of opening tag
      else if (char === '>') {
        inTag = false

        // Extract tag name
        const tagMatch = currentTag.match(/^([a-z0-9]+)/i)
        if (tagMatch && !currentTag.startsWith('/')) {
          const tagName = tagMatch[1].toLowerCase()
          // Only add to open tags if it's not a void element
          if (!voidElements.has(tagName)) {
            openTags.push(tagName)
          }
        }
        else if (tagMatch && currentTag.startsWith('/')) {
          // It's a closing tag, remove from stack if it matches
          const closingTag = tagMatch[1].toLowerCase()
          if (openTags.length > 0 && openTags[openTags.length - 1] === closingTag) {
            openTags.pop()
          }
        }
      }
      continue
    }

    // Handle HTML entities (like &nbsp; or &#123;)
    if (char === '&') {
      inEntity = true
      entityBuffer = char
      continue
    }

    if (inEntity) {
      entityBuffer += char
      if (char === ';') {
        inEntity = false
        result += entityBuffer
        textLength += 1 // Count entity as one character
        entityBuffer = ''
      }
      continue
    }

    // Regular character
    result += char
    textLength++
  }

  // If we're in the middle of an entity when we hit the limit, add the partial entity
  if (inEntity && entityBuffer.length > 0) {
    // If it's a partial entity, either complete it or discard it
    if (entityBuffer === '&') {
      // Just a single ampersand, treat as text
      result += '&'
    }
    else {
      // Discard the partial entity for safety
    }
  }

  // Add ellipsis if we've truncated the content
  if (textLength >= maxLength) {
    result += '...'
  }

  // Close any remaining open tags in reverse order
  for (let i = openTags.length - 1; i >= 0; i--) {
    result += `</${openTags[i]}>`
  }

  // Final safety check: strip any potentially dangerous tags/attributes
  // This is a simple implementation - a production system might use a more robust HTML sanitizer
  result = result.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/g, '')
    .replace(/on\w+='[^']*'/g, '')

  return result
}
