import type { CustomerSchema } from '../../../types/customer'
import type { GetAPISchema } from '../..'

import validateHandlers from '../../utils/validate-handlers'

const customerEndpoint: GetAPISchema<
  any,
  CustomerSchema
>['endpoint']['handler'] = (ctx) => {
  const { req, res, handlers } = ctx

  validateHandlers(req, res, {
    GET: handlers['getLoggedInCustomer'],
  })

  const body = null
  return handlers['getLoggedInCustomer']({ ...ctx, body })
}

export default customerEndpoint
