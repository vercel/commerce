import * as Core from '@vercel/commerce/types/login'
import type { LoginMutationVariables } from '../../schema'
import { LoginBody, LoginTypes } from '@vercel/commerce/types/login'

export * from '@vercel/commerce/types/login'

export type LoginHook<T extends LoginTypes = LoginTypes> = {
  data: null
  actionInput: LoginBody
  fetcherInput: LoginBody
  body: T['body']
}
