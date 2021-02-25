import { getConfig, ShopifyConfig } from '../api'
import { Page as PageType, PageEdge } from '../types'

export type Page = PageType

export const getAllPagesQuery = /* GraphQL */ `
  query($first: Int!) {
    pages(first: $first) {
      edges {
        node {
          id
          title
          handle
          body
          bodySummary
          url
        }
      }
    }
  }
`

type Variables = {
  first?: number
}

type Options = {
  variables?: Variables
  config: ShopifyConfig
  preview?: boolean
}

type ReturnType = {
  pages: Page[]
}

const getAllPages = async (options?: Options): Promise<ReturnType> => {
  let { config, variables = { first: 250 } } = options || {}

  config = getConfig(config)

  const { data } = await config.fetch(getAllPagesQuery, { variables })

  const pages = data.pages.edges.map(({ node }: PageEdge) => {
    return {
      ...node,
      name: node.handle,
      url: `${config!.locale}/${node.handle}`,
    }
  })

  return { pages }
}

export default getAllPages
