export type LogoutHook = {
  data: null
  body: {
    redirectTo?: string
  }
}

export type LogoutSchema = {
  endpoint: {
    options: {}
    handlers: {
      logout: LogoutHook
    }
  }
}
