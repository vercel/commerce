declare global {
  namespace NodeJS {
    interface Global {
      token: string | undefined | null
    }
  }
}
