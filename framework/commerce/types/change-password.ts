export type ChangePasswordBody = {
  email: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export type ChangePasswordTypes = {
  body: ChangePasswordBody
}

export type ChangePasswordHook<T extends ChangePasswordTypes = ChangePasswordTypes> = {
  data: null
  body: T['body']
  actionInput: T['body']
  fetcherInput: T['body']
}

export type ChangePasswordSchema<T extends ChangePasswordTypes = ChangePasswordTypes> = {
  endpoint: {
    options: {}
    handlers: {
      changePassword: ChangePasswordHook<T>
    }
  }
}
