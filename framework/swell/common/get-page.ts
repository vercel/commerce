import { getConfig, SwellConfig } from '../api'
import { Page } from './get-all-pages'

type Variables = {
  id: string
}

export type GetPageResult<T extends { page?: any } = { page?: Page }> = T

const getPage = async (options: {
  variables: Variables
  config: SwellConfig
  preview?: boolean
}): Promise<GetPageResult> => {
  let { config, variables } = options ?? {}

  config = getConfig(config)
  const { locale } = config
  const { id } = variables
  const result = await config.fetch('content', 'get', ['pages', id])
  const page = result

  return {
    page: page
      ? {
          ...page,
          url: `/${locale}/${page.slug}`,
        }
      : null,
  }
}

export default getPage
