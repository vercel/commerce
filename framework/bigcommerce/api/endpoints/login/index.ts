import type { GetAPISchema } from '@commerce/api'
import type { LoginSchema } from '../../../types/login'
import type { BigcommerceAPI } from '../..'
import login from './login'

export type LoginAPI = GetAPISchema<BigcommerceAPI, LoginSchema>

export type LoginEndpoint = LoginAPI['endpoint']

export const operations = { login }
