import { createEndpoint } from '@vercel/commerce/api'
import loginEndpoint from '@vercel/commerce/api/endpoints/login'

import type { GetAPISchema } from '@vercel/commerce/api'
import type { LoginBody, LoginSchema } from '@vercel/commerce/types/login'

import login from './login'

import type { OlistAPI } from '../../../api'
import type { Handler as HandlerAPI } from '../../../types/api'

export type LoginAPI = GetAPISchema<OlistAPI, LoginSchema>

export type LoginEndpoint = LoginAPI['endpoint']

export type Handler = { body: LoginBody } & HandlerAPI

export const handlers: LoginEndpoint['handlers'] = { login }

const loginApi = createEndpoint<LoginAPI>({
  handler: loginEndpoint,
  handlers,
})

export default loginApi
