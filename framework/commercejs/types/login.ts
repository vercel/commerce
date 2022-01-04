import { LoginBody, LoginTypes } from '@commerce/types/login'
export * from '@commerce/types/login'

export type LoginHook<T extends LoginTypes = LoginTypes> = {
  data: null
  actionInput: LoginBody
  fetcherInput: LoginBody
  body: T['body']
}
