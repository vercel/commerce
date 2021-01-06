import type { RecursivePartial, RecursiveRequired } from '../utils/types'
import { BigcommerceConfig, getConfig } from '..'
import { definitions } from '../definitions/store-content'

export type Page = definitions['page_Full']

export type GetAllPagesResult<
  T extends { pages: any[] } = { pages: Page[] }
> = T

async function getAllPages(opts?: {
  config?: BigcommerceConfig
  preview?: boolean
}): Promise<GetAllPagesResult>

async function getAllPages<T extends { pages: any[] }>(opts: {
  url: string
  config?: BigcommerceConfig
  preview?: boolean
}): Promise<GetAllPagesResult<T>>

async function getAllPages({
  config,
  preview,
}: {
  url?: string
  config?: BigcommerceConfig
  preview?: boolean
} = {}): Promise<GetAllPagesResult> {
  config = getConfig(config)
  // RecursivePartial forces the method to check for every prop in the data, which is
  // required in case there's a custom `url`
  const { data } = await config.storeApiFetch<
    RecursivePartial<{ data: Page[] }>
  >('/v3/content/pages')
  const pages = (data as RecursiveRequired<typeof data>) ?? []

  return {
    pages: preview ? pages : pages.filter((p) => p.is_visible),
  }
}

export default getAllPages
