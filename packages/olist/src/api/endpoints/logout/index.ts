import { createEndpoint } from '@vercel/commerce/api'
import logoutEndpoint from '@vercel/commerce/api/endpoints/logout'
import { LogoutSchema, LogoutTypes } from '@vercel/commerce/types/logout'

import type { GetAPISchema } from '@vercel/commerce/api'

import logout from './logout'

import type { OlistAPI } from '../../../api'
import type { Handler as HandlerAPI } from '../../../types/api'

export type LogoutAPI = GetAPISchema<OlistAPI, LogoutSchema>

export type LogoutEndpoint = LogoutAPI['endpoint']

export const handlers: LogoutEndpoint['handlers'] = { logout }

export type Handler = { body: LogoutTypes['body'] } & HandlerAPI

const logoutApi = createEndpoint<LogoutAPI>({
  handler: logoutEndpoint,
  handlers,
})

export default logoutApi
