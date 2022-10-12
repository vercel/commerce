import type { GetAPISchema } from '..'
import type { LoginSchema } from '../../types/login'

import validateHandlers from '../utils/validate-handlers'

import { getInput } from '../utils'
import { loginBodySchema } from '../../schemas/auth'

const loginEndpoint: GetAPISchema<
  any,
  LoginSchema
>['endpoint']['handler'] = async (ctx) => {
  const { req, handlers } = ctx

  validateHandlers(req, {
    POST: handlers['login'],
    GET: handlers['login'],
  })
  const input = await getInput(req)
  const body = loginBodySchema.parse(input)
  return await handlers['login']({ ...ctx, body })
}

export default loginEndpoint
