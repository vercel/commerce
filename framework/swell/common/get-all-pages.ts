import { getConfig, SwellConfig } from '../api'

type Variables = {
  first?: number
}

type ReturnType = {
  pages: Page[]
}

export type Page = {
  id: string
  name: string
  url: string
  sort_order?: number
  body: string
}

const getAllPages = async (options?: {
  variables?: Variables
  config: SwellConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)
  const { locale, fetchSwell } = config
  const { results } = await fetchSwell('content', 'list', ['pages'])
  const pages = results.map(({ slug, ...rest }) => ({
    url: `/${locale}/${slug}`,
    ...rest,
  }))

  return { pages }
}

export default getAllPages
