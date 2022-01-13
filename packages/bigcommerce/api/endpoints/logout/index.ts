import { GetAPISchema, createEndpoint } from '@commerce/api'
import logoutEndpoint from '@commerce/api/endpoints/logout'
import type { LogoutSchema } from '../../../types/logout'
import type { BigcommerceAPI } from '../..'
import logout from './logout'

export type LogoutAPI = GetAPISchema<BigcommerceAPI, LogoutSchema>

export type LogoutEndpoint = LogoutAPI['endpoint']

export const handlers: LogoutEndpoint['handlers'] = { logout }

const logoutApi = createEndpoint<LogoutAPI>({
  handler: logoutEndpoint,
  handlers,
})

export default logoutApi
