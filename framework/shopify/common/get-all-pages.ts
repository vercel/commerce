import { getConfig, ShopifyConfig } from '../api'
import { PageEdge } from '../schema'
import { getAllPagesQuery } from '../utils/queries'

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
  config: ShopifyConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)

  const { data } = await config.fetch(getAllPagesQuery, { variables })
  const edges = data.pages?.edges

  const pages = edges?.map(
    ({ node: { title: name, handle: url, ...node } }: PageEdge) => ({
      ...node,
      url,
      name,
    })
  )

  return { pages }
}

export default getAllPages
