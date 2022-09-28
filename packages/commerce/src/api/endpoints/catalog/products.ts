import { searchProductBodySchema } from '../../../schemas/product'
import type { GetAPISchema } from '../..'
import type { ProductsSchema } from '../../../types/product'

import validateHandlers from '../../utils/validate-handlers'

const productsEndpoint: GetAPISchema<
  any,
  ProductsSchema
>['endpoint']['handler'] = (ctx) => {
  const { req, res, handlers } = ctx

  validateHandlers(req, res, { GET: handlers['getProducts'] })

  const body = searchProductBodySchema.parse({
    search: req.query.search,
    categoryId: req.query.categoryId,
    brandId: req.query.brandId,
    sort: req.query.sort,
    locale: req.query.locale,
  })

  return handlers['getProducts']({ ...ctx, body })
}

export default productsEndpoint
