import type { Response } from '@vercel/fetch'

// Used for GraphQL errors
export class ReactionCommerceGraphQLError extends Error {}

export class ReactionCommerceApiError extends Error {
  status: number
  res: Response
  data: any

  constructor(msg: string, res: Response, data?: any) {
    super(msg)
    this.name = 'ReactionCommerceApiError'
    this.status = res.status
    this.res = res
    this.data = data
  }
}

export class ReactionCommerceNetworkError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'ReactionCommerceNetworkError'
  }
}
