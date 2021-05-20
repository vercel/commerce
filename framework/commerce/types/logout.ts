export type LogoutSchema = {
  endpoint: {
    options: {}
    handlers: {
      logout: {
        data: null
        body: { redirectTo?: string }
      }
    }
  }
}
