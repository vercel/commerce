import type { Response } from '@vercel/fetch'

export class CommercelayerApiError extends Error {
  status: number
  res: Response
  data: any

  constructor(msg: string, res: Response, data?: any) {
    super(msg)
    this.name = 'CommercelayerApiError'
    this.status = res.status
    this.res = res
    this.data = data
  }
}

export class CommercelayerNetworkError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'CommercelayerNetworkError'
  }
}