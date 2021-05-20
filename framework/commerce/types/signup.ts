export type SignupBody = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type SignupTypes = {
  body: SignupBody
}

export type SignupSchema<T extends SignupTypes = SignupTypes> = {
  endpoint: {
    options: {}
    handlers: {
      signup: {
        data: null
        body: T['body']
      }
    }
  }
}
