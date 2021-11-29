import { normalizeProduct } from '../../../../utils/normalizers/normalize-products'
import { ProductsEndpoint } from '.'

// Get products for the product list page. Search and category filter implemented. Sort and brand filter not implemented.
const getProducts: ProductsEndpoint['handlers']['getProducts'] = async ({
  req,
  res,
  body: { search, categoryId, brandId, sort },
  config: { restFetch },
}) => {
  // TODO: Add query params once we support filtering on products enpoint

  try {
    const response = await restFetch('GET', 'store/products', null)

    console.log(response)

    const products = response.products.map(normalizeProduct)
    const found = products.length > 0

    res.status(200).json({ data: { products, found } })
  } catch (err) {
    console.log(err)
    res.status(500)
  }
}

export default getProducts
