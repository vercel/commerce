import type { GetAPISchema } from '@commerce/api'
import type { LogoutSchema } from '../../../types/logout'
import type { BigcommerceAPI } from '../..'
import logout from './logout'

export type LogoutAPI = GetAPISchema<BigcommerceAPI, LogoutSchema>

export type LogoutEndpoint = LogoutAPI['endpoint']

export const operations = { logout }
