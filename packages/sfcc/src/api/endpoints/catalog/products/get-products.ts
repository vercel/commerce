import { normalizeSearchProducts } from '../../../utils/normalise-product'
import { ProductsEndpoint } from '.'

const getProducts: ProductsEndpoint['handlers']['getProducts'] = async ({
  body: { search, categoryId },
  config,
}) => {
  const { sdk } = config

  // 'clothing' is our main category default, and a manually set category has priority
  const searchTerm = categoryId ? (categoryId as string) : search || 'clothing'

  const searchClient = await sdk.getSearchClient()
  // use SDK search API for initial products
  const searchResults = await searchClient.productSearch({
    parameters: {
      q: searchTerm,
      limit: 20,
    },
  })

  let products = []
  let found = false
  if (searchResults.total) {
    found = true
    products = normalizeSearchProducts(searchResults.hits) as any[]
  }

  return { data: { products, found } }
}

export default getProducts
