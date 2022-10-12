import { Product } from '@vercel/commerce/types/product'
import { ProductsEndpoint } from '.'
import productSearchQuery from '../../../queries/product-search-query'
import { buildProductSearchVars } from '../../../../lib/product-search-vars'
import { normalizeProduct } from '../../../../lib/normalize'

const getProducts: ProductsEndpoint['handlers']['getProducts'] = async ({
  body: { search, categoryId, brandId, sort },
  config,
}) => {
  const pageSize = 100
  const filters = {}
  const startIndex = 0
  const variables = buildProductSearchVars({
    categoryCode: categoryId,
    pageSize,
    search,
    sort,
    filters,
    startIndex,
  })
  const { data } = await config.fetch(productSearchQuery, { variables })
  const found = data?.products?.items?.length > 0 ? true : false
  let productsResponse = data?.products?.items.map((item: any) =>
    normalizeProduct(item, config)
  )
  const products: Product[] = found ? productsResponse : []

  return { data: { products, found } }
}

export default getProducts
