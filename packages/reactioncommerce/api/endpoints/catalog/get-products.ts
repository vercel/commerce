import catalogItemsQuery from '@framework/utils/queries/catalog-items-query'
import { normalizeProduct } from '@framework/utils'
import type { ProductsEndpoint } from './products'
import getSearchVariables from '../../utils/get-search-variables'

const getCart: ProductsEndpoint['handlers']['getProducts'] = async ({
  req,
  res,
  config,
}) => {
  const {
    brandId,
    categoryId,
    search,
    sort,
  } = req.query

  const {
    data: { catalogItems },
  } = await config.fetch(catalogItemsQuery, {
    variables: {
      ...getSearchVariables({
        brandId,
        categoryId,
        search,
        sort,
      }),
      shopIds: [config.shopId],
    },
  })

  const products = catalogItems?.edges?.map(({ node }) => normalizeProduct(node))

  res.status(200).json({
    data: {
      products: products ?? null
    }
  })
}

export default getCart
