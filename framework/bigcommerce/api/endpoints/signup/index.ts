import type { GetAPISchema } from '@commerce/api'
import type { SignupSchema } from '../../../types/signup'
import type { BigcommerceAPI } from '../..'
import signup from './signup'

export type SignupAPI = GetAPISchema<BigcommerceAPI, SignupSchema>

export type SignupEndpoint = SignupAPI['endpoint']

export const operations = { signup }
