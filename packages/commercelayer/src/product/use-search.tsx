import { SWRHook } from '@vercel/commerce/utils/types'
import useSearch, { UseSearch } from '@vercel/commerce/product/use-search'
import getContentData from '../api/utils/getContentData'
import type { Products } from '../api/utils/getContentData'
export default useSearch as UseSearch<typeof handler>

const productsFinder = (
  products: Products,
  s: string,
  c?: string,
  b?: string
) => {
  let p = products
  if (s) p = p.filter((p) => p.name.toLowerCase().includes(s.toLowerCase()))
  if (c)
    p = p.filter((p) => p.categoryId.toLowerCase().includes(c.toLowerCase()))
  if (b) p = p.filter((p) => p.brandId.toLowerCase().includes(b.toLowerCase()))
  return p
}

export const handler: SWRHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input }) {
    const { search, categoryId, brandId } = input
    const contentData = await getContentData()
    const products = productsFinder(contentData, search, categoryId, brandId)
    return products.length > 0
      ? {
          products,
          found: true,
        }
      : {
          products: contentData,
        }
  },
  useHook:
    ({ useData }) =>
    (input = {}) => {
      return useData({
        input: [
          ['search', input.search],
          ['categoryId', input.categoryId],
          ['brandId', input.brandId],
          ['sort', input.sort],
        ],
        swrOptions: {
          revalidateOnFocus: false,
          ...input.swrOptions,
        },
      })
    },
}
