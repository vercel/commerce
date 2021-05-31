import { Product } from '@commerce/types/product'
import { ProductsEndpoint } from '.'

const SORT: { [key: string]: string | undefined } = {
  latest: 'id',
  trending: 'total_sold',
  price: 'price',
}

const LIMIT = 12

// Return current cart info
const getProducts: ProductsEndpoint['handlers']['getProducts'] = async ({
  res,
  body: { search, categoryId, brandId, sort },
  config,
  commerce,
}) => {
  // Use a dummy base as we only care about the relative path
  const url = new URL('/v3/catalog/products', 'http://a')

  url.searchParams.set('is_visible', 'true')
  url.searchParams.set('limit', String(LIMIT))

  if (search) url.searchParams.set('keyword', search)

  if (categoryId && Number.isInteger(Number(categoryId)))
    url.searchParams.set('categories:in', String(categoryId))

  if (brandId && Number.isInteger(Number(brandId)))
    url.searchParams.set('brand_id', String(brandId))

  if (sort) {
    const [_sort, direction] = sort.split('-')
    const sortValue = SORT[_sort]

    if (sortValue && direction) {
      url.searchParams.set('sort', sortValue)
      url.searchParams.set('direction', direction)
    }
  }

  // We only want the id of each product
  url.searchParams.set('include_fields', 'id')

  const { data } = await config.storeApiFetch<{ data: { id: number }[] }>(
    url.pathname + url.search
  )

  const ids = data.map((p) => String(p.id))
  const found = ids.length > 0

  // We want the GraphQL version of each product
  const graphqlData = await commerce.getAllProducts({
    variables: { first: LIMIT, ids },
    config,
  })

  // Put the products in an object that we can use to get them by id
  const productsById = graphqlData.products.reduce<{
    [k: string]: Product
  }>((prods, p) => {
    prods[Number(p.id)] = p
    return prods
  }, {})

  const products: Product[] = found ? [] : graphqlData.products

  // Populate the products array with the graphql products, in the order
  // assigned by the list of entity ids
  ids.forEach((id) => {
    const product = productsById[id]
    if (product) products.push(product)
  })

  res.status(200).json({ data: { products, found } })
}

export default getProducts
