import { ProductsEndpoint } from '.'
import { normalize as normalizeProduct } from '../../../../utils/product'

// Get products for the product list page. Search and category filter implemented. Sort and brand filter not implemented.
const getProducts: ProductsEndpoint['handlers']['getProducts'] = async ({
  req,
  body: { search, categoryId },
  config: { restBuyerFetch, tokenCookie },
}) => {
  const token = req.cookies.get(tokenCookie)?.value

  //Use a dummy base as we only care about the relative path
  const url = new URL('/me/products', 'http://a')

  if (search) {
    url.searchParams.set('search', search)
  }
  if (categoryId) {
    url.searchParams.set('categoryID', String(categoryId))
  }

  var rawProducts = await restBuyerFetch(
    'GET',
    url.pathname + url.search,
    null,
    { token }
  ).then((response: { Items: any[] }) => response.Items)

  return {
    data: {
      products: rawProducts.map(normalizeProduct),
      found: rawProducts?.length > 0,
    },
  }
}

export default getProducts
