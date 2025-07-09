import { format, parse } from 'date-fns'

export function formatDate(dateString: string): string {
  try {
    const date = parse(dateString, 'EEE, dd MMM yyyy HH:mm:ss xx', new Date())

    return format(date, 'dd.MM.yyyy')
  }
  catch (error) {
    console.error('Error parsing date:', error)
    return ''
  }
}
