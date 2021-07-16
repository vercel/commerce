import { GetAPISchema, createEndpoint } from '@commerce/api'
import loginEndpoint from '@commerce/api/endpoints/login'
import type { LoginSchema } from '../../../types/login'
import type { BigcommerceAPI } from '../..'
import login from './login'

export type LoginAPI = GetAPISchema<BigcommerceAPI, LoginSchema>

export type LoginEndpoint = LoginAPI['endpoint']

export const handlers: LoginEndpoint['handlers'] = { login }

const loginApi = createEndpoint<LoginAPI>({
  handler: loginEndpoint,
  handlers,
})

export default loginApi
