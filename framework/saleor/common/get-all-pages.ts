import { getConfig, SaleorConfig } from '../api'
import { PageCountableEdge } from '../schema'
import * as query from '../utils/queries'

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
  config: SaleorConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 100 } } = options ?? {}
  config = getConfig(config)
  const { locale } = config
  const { data } = await config.fetch(query.PageMany, { variables })

  const pages = data.pages?.edges?.map(
    ({ node: { title: name, slug, ...node } }: PageCountableEdge) => ({
      ...node,
      url: `/${locale}/${slug}`,
      name,
    })
  )

  return { pages }
}

export default getAllPages
