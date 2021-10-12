import { SWRHook } from '@commerce/utils/types'
import useSearch, { UseSearch } from '@commerce/product/use-search'
import data from '../data.json'
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
  async fetcher({ input, options, fetch }) {},
  useHook:
    ({ useData }) =>
    ({ search }) => {
      const { mutate } = useData()
      const products = productsFinder(search)
      mutate()
      return {
        data: {
          products,
        },
      }
    },
}
