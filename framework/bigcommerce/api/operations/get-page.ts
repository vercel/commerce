import type { RecursivePartial, RecursiveRequired } from '../utils/types'
import { BigcommerceConfig, getConfig } from '..'
import { definitions } from '../definitions/store-content'

export type Page = definitions['page_Full']

export type GetPageResult<T extends { page?: any } = { page?: Page }> = T

export type PageVariables = {
  id: number
}

async function getPage(opts: {
  url?: string
  variables: PageVariables
  config?: BigcommerceConfig
  preview?: boolean
}): Promise<GetPageResult>

async function getPage<T extends { page?: any }, V = any>(opts: {
  url: string
  variables: V
  config?: BigcommerceConfig
  preview?: boolean
}): Promise<GetPageResult<T>>

async function getPage({
  url,
  variables,
  config,
  preview,
}: {
  url?: string
  variables: PageVariables
  config?: BigcommerceConfig
  preview?: boolean
}): Promise<GetPageResult> {
  config = getConfig(config)
  // RecursivePartial forces the method to check for every prop in the data, which is
  // required in case there's a custom `url`
  const { data } = await config.storeApiFetch<RecursivePartial<{ data: Page[] }>>(
    url || `/v3/content/pages?id=${variables.id}&include=body`
  )
  const firstPage = data?.[0]
  const page = firstPage as RecursiveRequired<typeof firstPage>

  if (preview || page?.is_visible) {
    return { page }
  }
  return {}
}

export default getPage
