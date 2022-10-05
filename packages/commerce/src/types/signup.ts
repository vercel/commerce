export interface SignupBody {
  /**
   * The user's first name.
   */
  firstName: string
  /**
   * The user's last name.
   */
  lastName: string
  /**
   * The user's email address.
   */
  email: string
  /**
   * The user's password.
   */
  password: string
}

export type SignupHook = {
  data: null
  body: SignupBody
  actionInput: SignupBody
  fetcherInput: SignupBody
}

export type SignupSchema = {
  endpoint: {
    options: {}
    handlers: {
      signup: SignupHook
    }
  }
}
