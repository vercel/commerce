import { getConfig, ShopifyConfig } from '../api'
import { Page, PageEdge } from '../schema'
import { getAllPagesQuery } from '../utils/queries'

type Variables = {
  first?: number
}

type ReturnType = {
  pages: Page[]
}

const getAllPages = async (options?: {
  variables?: Variables
  config: ShopifyConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)

  const { data } = await config.fetch(getAllPagesQuery, { variables })
  const edges = data?.pages?.edges

  const pages = edges?.map(({ node }: PageEdge) => ({
    ...node,
    url: node.handle,
  }))

  return { pages }
}

export default getAllPages
