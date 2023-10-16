import type { SorterParams } from '@orama/orama'
import { OramaClient } from '@oramacloud/client'

const ORAMA_API_KEY = process.env.NEXT_PUBLIC_ORAMA_API_KEY!
const ORAMA_ENDPOINT = process.env.NEXT_PUBLIC_ORAMA_ENDPOINT!

export const orama = new OramaClient({ 
  endpoint: ORAMA_ENDPOINT, 
  api_key: ORAMA_API_KEY
})

export function trimDescription(description: string, maxSize = 80) {
  if (description.length > maxSize) {
    return `${description.substring(0, maxSize)}...`
  }
  return description
}

export function parseSorting(sorting: string | undefined): SorterParams<any> | undefined {
  switch (sorting) {
    case 'price-asc':
      return {
        property: 'priceRange.max',
        order: 'ASC'
      }
    case 'price-desc':
      return {
        property: 'priceRange.max',
        order: 'DESC'
      }
    default:
      return undefined
  }
}