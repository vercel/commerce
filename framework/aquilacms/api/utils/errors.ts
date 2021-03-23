import type { Response } from '@vercel/fetch'

// Used for GraphQL errors
export class AquilacmsGraphQLError extends Error {}

export class AquilacmsApiError extends Error {
  status: number
  res: Response
  data: any

  constructor(msg: string, res: Response, data?: any) {
    super(msg)
    this.name = 'AquilacmsApiError'
    this.status = res.status
    this.res = res
    this.data = data
  }
}

export class AquilacmsNetworkError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'AquilacmsNetworkError'
  }
}
