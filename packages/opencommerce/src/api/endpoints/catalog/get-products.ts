import type { ProductsEndpoint } from './products'
import getSearchVariables from '../../utils/get-search-variables'
import getSortVariables from '../../utils/get-sort-variables'
import {
  CatalogItemsQueryVariables,
  PrimaryShopQuery,
} from '../../../../schema'
import getPrimaryShopQuery from '../../queries/get-primary-shop-query'

const getProducts: ProductsEndpoint['handlers']['getProducts'] = async ({
  body: { brandId, search, sort, categoryId },
  config,
  commerce,
}) => {
  let sortParams = getSortVariables(sort)
  if (sortParams?.sortBy === 'featured' && !categoryId) {
    sortParams = null
  }

  const {
    data: { primaryShop },
  } = await config.fetch<PrimaryShopQuery>(getPrimaryShopQuery)

  if (!primaryShop?._id) {
    return {
      data: {
        products: [],
        found: false
      },
    }
  }

  let currency: string | null = primaryShop.currency.code

  const { products } = await commerce.getAllProducts({
    variables: {
      ...getSearchVariables({ brandId, search, categoryId }),
      ...(sortParams
        ? {
            sortBy: sortParams.sortBy as CatalogItemsQueryVariables['sortBy'],
            sortOrder:
              sortParams.sortOrder as CatalogItemsQueryVariables['sortOrder'],
          }
        : {}),
      ...(currency ? { sortByPriceCurrencyCode: currency } : {}),
    },
    config,
  })

  return {
    data: {
      products,
      found: !!products.length,
    },
  }
}

export default getProducts
