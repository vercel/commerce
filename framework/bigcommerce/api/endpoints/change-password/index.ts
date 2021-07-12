import { GetAPISchema, createEndpoint } from '@commerce/api'
import changePasswordEndpoint from '@commerce/api/endpoints/change-password'
import type { ChangePasswordSchema } from '../../../types/change-password'
import type { BigcommerceAPI } from '../..'
import changePassword from './change-password'

export type ChangePasswordAPI = GetAPISchema<BigcommerceAPI, ChangePasswordSchema>

export type ChangePasswordEndpoint = ChangePasswordAPI['endpoint']

export const handlers: ChangePasswordEndpoint['handlers'] = { changePassword }

const changePasswordApi = createEndpoint<ChangePasswordAPI>({
  handler: changePasswordEndpoint,
  handlers,
})

export default changePasswordApi
