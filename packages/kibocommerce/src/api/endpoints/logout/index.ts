import { GetAPISchema, createEndpoint } from '@vercel/commerce/api'
import logoutEndpoint from '@vercel/commerce/api/endpoints/logout'
import type { LogoutSchema } from '@vercel/commerce/types/logout'
import type { KiboCommerceAPI } from '../..'
import logout from './logout'

export type LogoutAPI = GetAPISchema<KiboCommerceAPI, LogoutSchema>

export type LogoutEndpoint = LogoutAPI['endpoint']

export const handlers: LogoutEndpoint['handlers'] = { logout }

const logoutApi = createEndpoint<LogoutAPI>({
  handler: logoutEndpoint,
  handlers,
})

export default logoutApi
