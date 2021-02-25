import { getConfig, ShopifyConfig } from '../api'
import getPageQuery from '../utils/queries/get-page-query'
import { Page } from './get-all-pages'

type Variables = {
  slug: string
}

type ReturnType = {
  page: Page
}

const getPage = async (options: {
  variables: Variables
  config: ShopifyConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables } = options ?? {}
  config = getConfig(config)

  const { data } = await config.fetch(getPageQuery, {
    variables,
  })

  const { pageByHandle: page } = data

  return {
    page: page
      ? {
          ...page,
          name: page.title,
          url: page?.handle,
        }
      : null,
  }
}

export default getPage
