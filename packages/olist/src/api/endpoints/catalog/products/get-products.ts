import type { Product } from '@vnda/headless-framework'

import { ProductsEndpoint, Handler } from '.'

import { mapItemRawToCommerceResponse } from '../../../../utils/product'

// Get products for the product list page. Search and category filter implemented. Sort and brand filter not implemented.
const getProducts: ProductsEndpoint['handlers']['getProducts'] = async ({
  res,
  body: { search, sort, categoryId },
  config: { service },
}: Handler) => {
  try {
    let result: Product[] = []

    result = await (search
      ? service.product.search({ term: search })
      : service.product.list({
          sort,
          limit: 20,
          ...(categoryId && { tag: [categoryId.toString()] }),
        }))

    const found = result?.length > 0

    res.status(200).json({
      data: { products: result?.map(mapItemRawToCommerceResponse), found },
    })
  } catch (error) {
    throw error
  }
}

export default getProducts
