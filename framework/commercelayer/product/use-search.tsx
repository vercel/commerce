import { SWRHook } from '@commerce/utils/types'
import useSearch, { UseSearch } from '@commerce/product/use-search'
import data from '../data.json'
import useCallback from 'react'
export default useSearch as UseSearch<typeof handler>

const productsFinder = (s: string) => {
  const { products } = data
  return s
    ? products.filter(
        (p) => p.name.toLowerCase().search(s.toLowerCase()) !== -1
      )
    : []
}

export const handler: SWRHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input, options, fetch }) {
    debugger
  },
  useHook:
    ({ useData }) =>
    ({ search }) => {
      const products = productsFinder(search)
      return {
        data:
          products.length > 0
            ? {
                products,
                found: true,
              }
            : null,
      }
    },
}
