import { getConfig, ShopifyConfig } from '../api'
import { QueryRoot, QueryRootPagesArgs } from '../schema'
import { normalizePages, getAllPagesQuery } from '../utils'

export type Page = {
  id: string
  name: string
  url: string
  sort_order?: number
  body: string
}

export type GetAllPagesResult = Promise<{
  pages: Page[]
}>

const getAllPages = async (options?: {
  variables?: QueryRootPagesArgs
  config?: ShopifyConfig
  preview?: boolean
}): GetAllPagesResult => {
  let { config, variables } = options ?? {}
  const { fetch, locale = 'en-US', locales = ['en-US'] } = getConfig(config)

  const {
    data: {
      pages: { edges },
    },
  } = await fetch<QueryRoot, QueryRootPagesArgs>(
    getAllPagesQuery,
    {
      variables,
    },
    {
      headers: {
        'Accept-Language': locale,
      },
    }
  )

  return {
    pages: locales.reduce<Page[]>(
      (arr, locale) => arr.concat(normalizePages(edges, locale)),
      []
    ),
  }
}

export default getAllPages
