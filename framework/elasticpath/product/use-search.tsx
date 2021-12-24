import { SWRHook } from '@commerce/utils/types'
import useSearch, { UseSearch } from '@commerce/product/use-search'
import type { SearchProductsHook } from '../types/product'
import epClient from '../utils/ep-client'
import normalizeProducts from '../utils/normalize'

export default useSearch as UseSearch<typeof handler>

export type SearchProductsInput = {
  search?: string
  sort?: string
}

export const handler: SWRHook<SearchProductsHook> = {
  fetchOptions: {
    url: 'Products',
    method: 'All',
  },
  async fetcher({ input: { search, sort }, options, fetch }) {
    // Use a dummy base as we only care about the relative path
    let url = new URL(options.url!, 'http://api.moltin.com')

    if (search) url.searchParams.set('search', search)
    if (sort) url.searchParams.set('sort', sort)

    if(sort){
      let productsRes = await epClient.PCM.Sort(sort).All();
      let products = await normalizeProducts(productsRes.data);
      return {
        products: products,
      }
    }
    else{
      let productsRes = await epClient.PCM.All()
      let products = await normalizeProducts(productsRes.data);
      return {
        products: products
      }
    }
  },
  useHook: ({ useData }) => (input = {}) => {
    return useData({
      input: [
        ['search', input.search],
        ['sort', input.sort],
      ],
      swrOptions: {
        revalidateOnFocus: false,
        ...input.swrOptions,
      },
    })
  },
}