export interface LoginBody {
  /**
   * The user's email address.
   */
  email: string
  /**
   * The user's password.
   */
  password: string
}

export interface LoginHook {
  data: null
  actionInput: LoginBody
  fetcherInput: LoginBody
  body: LoginBody
}

export type LoginSchema = {
  endpoint: {
    options: {}
    handlers: {
      login: LoginHook
    }
  }
}

export type LoginOperation = {
  data: { result?: string }
  variables: unknown
}
