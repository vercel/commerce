import type { ProductsSchema } from '../../../types/product'
import { CommerceAPIError } from '../../utils/errors'
import isAllowedOperation from '../../utils/is-allowed-operation'
import type { GetAPISchema } from '../..'

const productsEndpoint: GetAPISchema<
  any,
  ProductsSchema
>['endpoint']['handler'] = async (ctx) => {
  const { req, res, handlers } = ctx

  if (!isAllowedOperation(req, res, { GET: handlers['getProducts'] })) {
    return
  }

  try {
    const body = req.query
    return await handlers['getProducts']({ ...ctx, body })
  } catch (error) {
    console.error(error)

    const message =
      error instanceof CommerceAPIError
        ? 'An unexpected error ocurred with the Commerce API'
        : 'An unexpected error ocurred'

    res.status(500).json({ data: null, errors: [{ message }] })
  }
}

export default productsEndpoint
