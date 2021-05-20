export type LoginBody = {
  email: string
  password: string
}

export type LoginTypes = {
  body: LoginBody
}

export type LoginSchema<T extends LoginTypes = LoginTypes> = {
  endpoint: {
    options: {}
    operations: {
      login: {
        data: null
        body: T['body']
      }
    }
  }
}

export type LoginOperation = {
  data: { result?: string }
  variables: unknown
}
