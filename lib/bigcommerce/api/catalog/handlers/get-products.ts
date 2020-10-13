import getAllProducts from '../../operations/get-all-products'
import type { ProductsHandlers } from '../products'

// Return current cart info
const getProducts: ProductsHandlers['getProducts'] = async ({
  res,
  body: { search },
  config,
}) => {
  // Use a dummy base as we only care about the relative path
  const url = new URL('/v3/catalog/products', 'http://a')

  if (search) url.searchParams.set('keyword', search)

  // We only want the id of each product
  url.searchParams.set('include_fields', 'id')

  const { data } = await config.storeApiFetch<{ data: { id: number }[] }>(
    url.pathname + url.search
  )
  const entityIds = data.map((p) => p.id)
  const found = entityIds.length > 0
  // We want the GraphQL version of each product
  const { products } = await getAllProducts({ variables: { entityIds } })

  res.status(200).json({ data: { products, found } })
}

export default getProducts
