import { NextApiRequest, NextApiResponse } from 'next'
import type { OlistConfig } from '../api'

export type Handler = {
  req: NextApiRequest
  res: NextApiResponse
  config: OlistConfig
}

export type FetcherResponse<T> = {
  data: T
}
