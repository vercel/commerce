export type LogoutSchema = {
  endpoint: {
    options: {}
    operations: {
      logout: {
        data: null
        body: { redirectTo?: string }
      }
    }
  }
}
