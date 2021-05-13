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
  const { locale, fetch } = config
  const data = await fetch('content', 'list', ['pages'])
  const pages =
    data?.results?.map(({ slug, ...rest }: { slug: string }) => ({
      url: `/${locale}/${slug}`,
      ...rest,
    })) ?? []

  return { pages }
}

export default getAllPages
