import type { HookFetcher } from '@commerce/utils/types'
import type { SwrOptions } from '@commerce/utils/use-data'
import useCommerceSearch from '@commerce/products/use-search'
import type { SearchProductsData } from '../api/catalog/products'
import useResponse from '@commerce/utils/use-response'

export const searchQuery = /* GraphQL */ `
  query search($input: SearchInput!) {
    search(input: $input) {
      items {
        productId
        currencyCode
        productName
        description
        priceWithTax {
          ...on SinglePrice {
            value
          }
          ...on PriceRange {
            min max
          }
        }
        productAsset {
          preview
        }
        slug
      }
      totalItems
    }
  }
`

export type SearchProductsInput = {
  search?: string
  categoryId?: number
  brandId?: number
  sort?: string
}

export const fetcher: HookFetcher<SearchProductsData, SearchProductsInput> = (
  options,
  { search, categoryId, brandId, sort },
  fetch
) => {
  return fetch({
    query: searchQuery,
    variables: {
      input: {
        term: search,
        collectionId: categoryId,
        groupByProduct: true
      }
    }
  })
}

export function extendHook(
  customFetcher: typeof fetcher,
  swrOptions?: SwrOptions<any, SearchProductsInput>
) {
  const useSearch = (input: SearchProductsInput = {}) => {
    const response = useCommerceSearch(
      {},
      [
        ['search', input.search],
        ['categoryId', input.categoryId],
        ['brandId', input.brandId],
        ['sort', input.sort]
      ],
      customFetcher,
      { revalidateOnFocus: false, ...swrOptions }
    )

    return useResponse(response, {
      normalizer: data => {
        return {
          found: data?.search.totalItems > 0,
          products: data?.search.items.map((item: any) => ({
            id: item.productId,
            name: item.productName,
            description: item.description,
            slug: item.slug,
            path: item.slug,
            images: [{ url: item.productAsset?.preview }],
            variants: [],
            price: {
              value: (item.priceWithTax.min / 100),
              currencyCode: item.currencyCode
            },
            options: [],
            sku: item.sku
          })) ?? [],
        }
      }
    })
  }

  useSearch.extend = extendHook

  return useSearch
}

export default extendHook(fetcher)
