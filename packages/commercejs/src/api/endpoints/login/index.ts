import { GetAPISchema, createEndpoint } from '@vercel/commerce/api'
import loginEndpoint from '@vercel/commerce/api/endpoints/login'
import type { LoginSchema } from '@vercel/commerce/types/login'
import type { CommercejsAPI } from '../..'
import login from './login'

export type LoginAPI = GetAPISchema<CommercejsAPI, LoginSchema>

export type LoginEndpoint = LoginAPI['endpoint']

export const handlers: LoginEndpoint['handlers'] = { login }

const loginApi = createEndpoint<LoginAPI>({
  handler: loginEndpoint,
  handlers,
})

export default loginApi
