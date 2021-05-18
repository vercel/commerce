import type { CustomerSchema } from '../../types/customer'
import { CommerceAPIError } from '../utils/errors'
import isAllowedOperation from '../utils/is-allowed-operation'
import type { GetAPISchema } from '..'

const customerEndpoint: GetAPISchema<
  any,
  CustomerSchema
>['endpoint']['handler'] = async (ctx) => {
  const { req, res, operations } = ctx

  if (
    !isAllowedOperation(req, res, {
      GET: operations['getLoggedInCustomer'],
    })
  ) {
    return
  }

  try {
    const body = null
    return await operations['getLoggedInCustomer']({ ...ctx, body })
  } catch (error) {
    console.error(error)

    const message =
      error instanceof CommerceAPIError
        ? 'An unexpected error ocurred with the Commerce API'
        : 'An unexpected error ocurred'

    res.status(500).json({ data: null, errors: [{ message }] })
  }
}

export default customerEndpoint
