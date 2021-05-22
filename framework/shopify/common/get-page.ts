import { Page as ShopifyPage, QueryRoot, QueryRootPagesArgs } from '../schema'
import { normalizePage, getPageQuery } from '../utils'
import { getConfig, ShopifyConfig } from '../api'
import type { Page } from './get-all-pages'

type GetPageInput = {
  id: string
}

type GetPageResult = {
  page?: Page
}

const getPage = async ({
  variables,
  config,
}: {
  variables: GetPageInput
  config?: ShopifyConfig
  preview?: boolean
}): Promise<GetPageResult> => {
  const { locale = 'en-US', fetch } = getConfig(config)

  const {
    data: { node: page },
  } = await fetch<QueryRoot, GetPageInput>(
    getPageQuery,
    {
      variables,
    },
    {
      headers: {
        'Accept-Language': locale,
      },
    }
  )

  return page ? { page: normalizePage(page as ShopifyPage, locale) } : {}
}

export default getPage
