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

  const { data } = await config.storeApiFetch(url.pathname + url.search)

  res.status(200).json({ data })
}

export default getProducts
