// Used for GraphQL errors
export class BigcommerceGraphQLError extends Error {}

export class BigcommerceApiError extends Error {
  status: number
  res: Response
  data: any

  constructor(msg: string, res: Response, data?: any) {
    super(msg)
    this.name = 'BigcommerceApiError'
    this.status = res.status
    this.res = res
    this.data = data
  }
}

export class BigcommerceNetworkError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'BigcommerceNetworkError'
  }
}
