export type LogoutTypes = {
  body: { redirectTo?: string }
}

export type LogoutHook<T extends LogoutTypes = LogoutTypes> = {
  data: null
  body: T['body']
}

export type LogoutSchema<T extends LogoutTypes = LogoutTypes> = {
  endpoint: {
    options: {}
    handlers: {
      logout: LogoutHook<T>
    }
  }
}
