import * as Core from '@commerce/types/login'
import type { LoginMutationVariables } from '../schema'
import { LoginBody, LoginTypes } from '@commerce/types/login'

export * from '@commerce/types/login'

export type LoginHook<T extends LoginTypes = LoginTypes> = {
  data: null
  actionInput: LoginBody
  fetcherInput: LoginBody
  body: T['body']
}
