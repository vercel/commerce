import type { GetAPISchema } from '../..'
import type { ProductsSchema } from '../../../types/product'

import validateHandlers from '../../utils/validate-handlers'
import {
  searchProductBodySchema,
  searchProductsSchema,
} from '../../../schemas/product'
import { parse } from '../../utils'

const productsEndpoint: GetAPISchema<
  any,
  ProductsSchema
>['endpoint']['handler'] = async (ctx) => {
  const { req, handlers } = ctx

  validateHandlers(req, { GET: handlers['getProducts'] })
  const { searchParams } = new URL(req.url)

  const body = searchProductBodySchema.parse({
    search: searchParams.get('search') ?? undefined,
    categoryId: searchParams.get('categoryId') ?? undefined,
    brandId: searchParams.get('brandId') ?? undefined,
    sort: searchParams.get('sort') ?? undefined,
  })

  const res = await handlers['getProducts']({ ...ctx, body })

  res.headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600, stale-while-revalidate, public',
    ...res.headers,
  }

  return parse(res, searchProductsSchema)
}

export default productsEndpoint
