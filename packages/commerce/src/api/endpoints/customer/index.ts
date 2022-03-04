import type { CustomerSchema } from '../../../types/customer'
import type { GetAPISchema } from '../..'

import { CommerceAPIError } from '../../utils/errors'
import isAllowedOperation from '../../utils/is-allowed-operation'

const customerEndpoint: GetAPISchema<
  any,
  CustomerSchema<any>
>['endpoint']['handler'] = async (ctx) => {
  const { req, res, handlers } = ctx

  if (
    !isAllowedOperation(req, res, {
      GET: handlers['getLoggedInCustomer'],
    })
  ) {
    return
  }

  try {
    const body = null
    return await handlers['getLoggedInCustomer']({ ...ctx, body })
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
