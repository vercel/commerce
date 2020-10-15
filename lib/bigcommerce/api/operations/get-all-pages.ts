import type { RecursivePartial, RecursiveRequired } from '../utils/types'
import filterEdges from '../utils/filter-edges'
import { BigcommerceConfig, getConfig } from '..'
import { definitions } from '../definitions/store-content'

export type Page = definitions['page_Full']

export type GetAllPagesResult<
  T extends { pages: any[] } = { pages: Page[] }
> = T

async function getAllPages(opts?: {
  config?: BigcommerceConfig
}): Promise<GetAllPagesResult>

async function getAllPages<T extends { pages: any[] }, V = any>(opts: {
  url: string
  config?: BigcommerceConfig
}): Promise<GetAllPagesResult<T>>

async function getAllPages({
  config,
}: {
  url?: string
  config?: BigcommerceConfig
} = {}): Promise<GetAllPagesResult> {
  config = getConfig(config)
  // RecursivePartial forces the method to check for every prop in the data, which is
  // required in case there's a custom `url`
  const { data } = await config.storeApiFetch<
    RecursivePartial<{ data: Page[] }>
  >('/v3/content/pages')

  return {
    pages: (data as RecursiveRequired<typeof data>) ?? [],
  }
}

export default getAllPages
