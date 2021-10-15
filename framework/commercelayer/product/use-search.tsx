import { SWRHook } from '@commerce/utils/types'
import useSearch, { UseSearch } from '@commerce/product/use-search'
import data from '../data.json'
export default useSearch as UseSearch<typeof handler>

const productsFinder = (s: string, c?: string, b?: string) => {
  const { products } = data
  let p = products
  if (s)
    p = p.filter((p) => p.name.toLowerCase().search(s.toLowerCase()) !== -1)
  if (c)
    p = p.filter(
      (p) => p.categoryId.toLowerCase().search(c.toLowerCase()) !== -1
    )
  if (b)
    p = p.filter((p) => p.brandId.toLowerCase().search(b.toLowerCase()) !== -1)
  return p
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
    ({ search, categoryId, brandId }) => {
      const products = productsFinder(search, categoryId, brandId)
      return {
        data:
          products.length > 0
            ? {
                products,
                found: true,
              }
            : data,
      }
    },
}
