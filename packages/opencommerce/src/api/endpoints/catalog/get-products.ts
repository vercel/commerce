import type { ProductsEndpoint } from './products'
import getSearchVariables from '../../utils/get-search-variables'
import getSortVariables from '../../utils/get-sort-variables'
import { CatalogItemsQueryVariables } from '../../../../schema'
import getShopCurrencyQuery from '../../queries/get-shop-currency-query'

const getProducts: ProductsEndpoint['handlers']['getProducts'] = async ({
  body: { brandId, search, sort, categoryId },
  res,
  config,
  commerce,
}) => {
  let sortParams = getSortVariables(sort)
  if (sortParams?.sortBy === 'featured' && !categoryId) {
    sortParams = null
  }

  let currency: string | null = null

  if (sortParams?.sortBy === 'minPrice') {
    const {
      data: {
        shop: {
          currency: { code },
        },
      },
    } = await config.fetch(getShopCurrencyQuery, {
      variables: { id: config.shopId },
    })
    currency = code
  }

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

  res.status(200).json({
    data: {
      products,
      found: !!products.length,
    },
  })
}

export default getProducts
