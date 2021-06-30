import type { Response } from '@vercel/fetch'

// Used for GraphQL errors
export class CommercetoolsGraphQLError extends Error {}

export class CommercetoolsApiError extends Error {
  status: number
  res: Response
  data: any

  constructor(msg: string, res: Response, data?: any) {
    super(msg)
    this.name = 'CommercetoolsApiError'
    this.status = res.status
    this.res = res
    this.data = data
  }
}

export class CommercetoolsNetworkError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'CommercetoolsNetworkError'
  }
}
