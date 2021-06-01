import type { CheckoutSchema } from '../../types/checkout'
import { CommerceAPIError } from '../utils/errors'
import isAllowedOperation from '../utils/is-allowed-operation'
import type { GetAPISchema } from '..'

const checkoutEndpoint: GetAPISchema<
  any,
  CheckoutSchema
>['endpoint']['handler'] = async (ctx) => {
  const { req, res, handlers } = ctx

  if (
    !isAllowedOperation(req, res, {
      GET: handlers['checkout'],
    })
  ) {
    return
  }

  try {
    const body = null
    return await handlers['checkout']({ ...ctx, body })
  } catch (error) {
    console.error(error)

    const message =
      error instanceof CommerceAPIError
        ? 'An unexpected error ocurred with the Commerce API'
        : 'An unexpected error ocurred'

    res.status(500).json({ data: null, errors: [{ message }] })
  }
}

export default checkoutEndpoint
