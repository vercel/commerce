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
  res.status(200).json({
    data: {
      products: [],
      found: false,
    },
  })
}

export default getProducts
