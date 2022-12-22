import type { GetAPISchema } from '..'
import type { SignupSchema } from '../../types/signup'

import { getInput } from '../utils'
import validateHandlers from '../utils/validate-handlers'

import { signupBodySchema } from '../../schemas/auth'

const signupEndpoint: GetAPISchema<
  any,
  SignupSchema
>['endpoint']['handler'] = async (ctx) => {
  const { req, handlers, config } = ctx

  validateHandlers(req, {
    POST: handlers['signup'],
  })

  const input = await getInput(req)
  const { cookies } = req
  const cartId = cookies.get(config.cartCookie)?.value

  const body = signupBodySchema.parse({ ...input, cartId })
  return handlers['signup']({ ...ctx, body })
}

export default signupEndpoint
