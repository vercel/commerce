import { createEndpoint } from '@vercel/commerce/api'
import signupEndpoint from '@vercel/commerce/api/endpoints/signup'

import type { GetAPISchema } from '@vercel/commerce/api'
import type { SignupBody, SignupSchema } from '@vercel/commerce/types/signup'

import signup from './signup'

import type { OlistAPI } from '../../../api'
import type { Handler as HandlerAPI } from '../../../types/api'

export type SignupAPI = GetAPISchema<OlistAPI, SignupSchema>

export type SignupEndpoint = SignupAPI['endpoint']

export const handlers: SignupEndpoint['handlers'] = { signup }

export type Handler = { body: SignupBody } & HandlerAPI

const singupApi = createEndpoint<SignupAPI>({
  handler: signupEndpoint,
  handlers,
})

export default singupApi
