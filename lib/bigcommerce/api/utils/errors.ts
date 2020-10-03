// Used for GraphQL errors
export class BigcommerceError extends Error {
  status?: number

  constructor(msg: string, res?: Response) {
    super(msg)
    this.name = 'BigcommerceError'

    if (res) {
      this.status = res.status
    }
  }
}

export class BigcommerceApiError extends Error {
  status: number
  res: Response

  constructor(msg: string, res: Response) {
    super(msg)
    this.name = 'BigcommerceApiError'
    this.status = res.status
    this.res = res
  }
}

export class BigcommerceNetworkError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'BigcommerceNetworkError'
  }
}
