import { format, parse } from 'date-fns'
import { enUS } from 'date-fns/locale'

export function formatDate(dateString: string): string {
  const parseStrategies = [
    // Strategy 1: Parse with GMT timezone format (used by Habr for example)
    () => parse(dateString, 'EEE, dd MMM yyyy HH:mm:ss \'GMT\'', new Date(), { locale: enUS }),

    // Strategy 2: Parse with timezone offset format
    () => parse(dateString, 'EEE, dd MMM yyyy HH:mm:ss xx', new Date(), { locale: enUS }),

    // Strategy 3: Use built-in Date object as fallback
    () => {
      const date = new Date(dateString)
      if (Number.isNaN(date.getTime())) {
        throw new TypeError('Invalid date')
      }
      return date
    },
  ]

  for (const strategy of parseStrategies) {
    try {
      const date = strategy()
      return format(date, 'dd.MM.yyyy')
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (err) {
      // Continue to the next strategy
      continue
    }
  }

  console.error('Error parsing date:', dateString)
  return ''
}
