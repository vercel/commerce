import catalogItemsQuery from '@framework/utils/queries/catalog-items-query'
import { normalizeProduct } from '@framework/utils'
import type { ProductsEndpoint } from '.'

const getCart: ProductsEndpoint['handlers']['getProducts'] = async ({
  req,
  res,
  config,
}) => {
  const {
    data: { catalogItems },
  } = await config.fetch(catalogItemsQuery, {
    variables: {
      shopIds: [config.shopId],
    },
  })

  const products = catalogItems.map((item) => normalizeProduct(item))

  res.status(200).json({ data: products ?? null })
}

export default getCart
