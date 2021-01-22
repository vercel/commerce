import type { RecursivePartial, RecursiveRequired } from '../api/utils/types'
import { VendureConfig, getConfig } from '../api'
import { definitions } from '../api/definitions/store-content'

export type Page = definitions['page_Full']

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
