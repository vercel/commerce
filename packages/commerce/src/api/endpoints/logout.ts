import type { GetAPISchema } from '..'
import type { LogoutSchema } from '../../types/logout'

import { logoutBodySchema } from '../../schemas/auth'
import validateHandlers from '../utils/validate-handlers'

const logoutEndpoint: GetAPISchema<any, LogoutSchema>['endpoint']['handler'] = (
  ctx
) => {
  const { req, res, handlers } = ctx

  validateHandlers(req, res, {
    GET: handlers['logout'],
  })

  const redirectTo = req.query.redirect_to

  const body = logoutBodySchema.parse(
    typeof redirectTo === 'string' ? { redirectTo } : {}
  )

  return handlers['logout']({ ...ctx, body })
}

export default logoutEndpoint
