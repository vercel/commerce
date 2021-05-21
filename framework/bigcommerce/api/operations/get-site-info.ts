import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
import type { GetSiteInfoOperation } from '../../types/site'
import type { GetSiteInfoQuery } from '../../schema'
import type { RecursivePartial, RecursiveRequired } from '../utils/types'
import filterEdges from '../utils/filter-edges'
import type { BigcommerceConfig, Provider } from '..'
import { categoryTreeItemFragment } from '../fragments/category-tree'

// Get 3 levels of categories
export const getSiteInfoQuery = /* GraphQL */ `
  query getSiteInfo {
    site {
      categoryTree {
        ...categoryTreeItem
        children {
          ...categoryTreeItem
          children {
            ...categoryTreeItem
          }
        }
      }
      brands {
        pageInfo {
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            entityId
            name
            defaultImage {
              urlOriginal
              altText
            }
            pageTitle
            metaDesc
            metaKeywords
            searchKeywords
            path
          }
        }
      }
    }
  }
  ${categoryTreeItemFragment}
`

export default function getSiteInfoOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getSiteInfo<T extends GetSiteInfoOperation>(opts?: {
    config?: BigcommerceConfig
    preview?: boolean
  }): Promise<T['data']>

  async function getSiteInfo<T extends GetSiteInfoOperation>(
    opts: {
      config?: BigcommerceConfig
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getSiteInfo<T extends GetSiteInfoOperation>({
    query = getSiteInfoQuery,
    config,
  }: {
    query?: string
    config?: BigcommerceConfig
    preview?: boolean
  } = {}): Promise<T['data']> {
    config = commerce.getConfig(config)
    // RecursivePartial forces the method to check for every prop in the data, which is
    // required in case there's a custom `query`
    const { data } = await config.fetch<RecursivePartial<GetSiteInfoQuery>>(
      query
    )
    const categories = data.site?.categoryTree
    const brands = data.site?.brands?.edges

    return {
      categories: (categories as RecursiveRequired<typeof categories>) ?? [],
      brands: filterEdges(brands as RecursiveRequired<typeof brands>),
    }
  }

  return getSiteInfo
}
