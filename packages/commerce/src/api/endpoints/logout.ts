import type { GetAPISchema } from '..'
import type { LogoutSchema } from '../../types/logout'

import { logoutBodySchema } from '../../schemas/auth'
import validateHandlers from '../utils/validate-handlers'
import { normalizeApiError } from '../utils/errors'

const logoutEndpoint: GetAPISchema<
  any,
  LogoutSchema
>['endpoint']['handler'] = async (ctx) => {
  const { req, handlers } = ctx

  validateHandlers(req, {
    GET: handlers['logout'],
  })

  const redirectTo = new URL(req.url).searchParams.get('redirectTo')

  const body = logoutBodySchema.parse(
    typeof redirectTo === 'string' ? { redirectTo } : {}
  )

  return await handlers['logout']({ ...ctx, body })
}

export default logoutEndpoint
