import { getConfig, ShopifyConfig } from '../api'
import getPageQuery from '../utils/queries/get-page-query'
import { Page } from './get-all-pages'

type Variables = {
  id: string
}

export type GetPageResult<T extends { page?: any } = { page?: Page }> = T

const getPage = async (options: {
  variables: Variables
  config: ShopifyConfig
  preview?: boolean
}): Promise<GetPageResult> => {
  let { config, variables } = options ?? {}

  config = getConfig(config)
  const { locale } = config

  const { data } = await config.fetch(getPageQuery, {
    variables,
  })
  const page = data.node

  return {
    page: page
      ? {
          ...page,
          name: page.title,
          url: `/${locale}/${page.handle}`,
        }
      : null,
  }
}

export default getPage
