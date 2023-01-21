import { GetAPISchema, createEndpoint } from '@vercel/commerce/api'
import signupEndpoint from '@vercel/commerce/api/endpoints/signup'
import type { SignupSchema } from '@vercel/commerce/types/signup'
import type { OrdercloudAPI } from '../..'
import signup from './signup'

export type SignupAPI = GetAPISchema<OrdercloudAPI, SignupSchema>

export type SignupEndpoint = SignupAPI['endpoint']

export const handlers: SignupEndpoint['handlers'] = { signup }

const singupApi = createEndpoint<SignupAPI>({
  handler: signupEndpoint,
  handlers,
})

export default singupApi
