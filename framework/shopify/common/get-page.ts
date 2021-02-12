import { GraphQLFetcherResult } from '@commerce/api'

import { getConfig, ShopifyConfig } from '../api'
import getPageQuery from '@framework/utils/queries/get-page-query'
import { Page, PageEdge } from '@framework/schema'

type Variables = {
  slug: string
}

type ReturnType = {
  page: any
}

const getPage = async (options: {
  variables: Variables
  config: ShopifyConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables } = options ?? {}
  config = getConfig(config)

  const { data }: GraphQLFetcherResult = await config.fetch(getPageQuery, {
    variables,
  })

  const page: Page = data?.pageByHandle

  return {
    page: page
      ? {
          ...page,
          url: page?.handle,
        }
      : null,
  }
}

export default getPage
