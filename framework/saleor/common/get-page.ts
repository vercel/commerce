import { getConfig, SaleorConfig } from '../api'
import { getPageQuery } from '../utils/queries'
import { Page } from './get-all-pages'

type Variables = {
  id: string
}

export type GetPageResult<T extends { page?: any } = { page?: Page }> = T

const getPage = async (options: {
  variables: Variables
  config: SaleorConfig
  preview?: boolean
}): Promise<GetPageResult> => {
  let { config, variables } = options ?? {}

  config = getConfig(config)
  const { locale } = config

  const { data } = await config.fetch(getPageQuery, {
    variables,
  })
  const page = data.page

  return {
    page: page
      ? {
          ...page,
          name: page.title,
          url: `/${locale}/${page.slug}`,
        }
      : null,
  }
}

export default getPage
