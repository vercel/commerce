import { getConfig, VendureConfig } from '../api'

export type Page = any

export type GetAllPagesResult<
  T extends { pages: any[] } = { pages: Page[] }
> = T

async function getAllPages(opts?: {
  config?: VendureConfig
  preview?: boolean
}): Promise<GetAllPagesResult>

async function getAllPages<T extends { pages: any[] }>(opts: {
  url: string
  config?: VendureConfig
  preview?: boolean
}): Promise<GetAllPagesResult<T>>

async function getAllPages({
  config,
  preview,
}: {
  url?: string
  config?: VendureConfig
  preview?: boolean
} = {}): Promise<GetAllPagesResult> {
  config = getConfig(config)

  return {
    pages: [],
  }
}

export default getAllPages
