import type { GetAPISchema } from '..'
import type { LoginSchema } from '../../types/login'

import validateHandlers from '../utils/validate-handlers'

const loginEndpoint: GetAPISchema<any, LoginSchema>['endpoint']['handler'] = (
  ctx
) => {
  const { req, res, handlers } = ctx

  validateHandlers(req, res, {
    POST: handlers['login'],
    GET: handlers['login'],
  })

  const body = req.body ?? {}
  return handlers['login']({ ...ctx, body })
}

export default loginEndpoint
