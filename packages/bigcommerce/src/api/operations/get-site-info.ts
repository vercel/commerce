import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import type { GetSiteInfoOperation } from '../../types/site'
import type { GetSiteInfoQuery } from '../../../schema'
import filterEdges from '../utils/filter-edges'
import type { BigcommerceConfig, Provider } from '..'
import { categoryTreeItemFragment } from '../fragments/category-tree'
import { normalizeCategory } from '../../lib/normalize'

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
    config?: Partial<BigcommerceConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getSiteInfo<T extends GetSiteInfoOperation>(
    opts: {
      config?: Partial<BigcommerceConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getSiteInfo<T extends GetSiteInfoOperation>({
    query = getSiteInfoQuery,
    config,
  }: {
    query?: string
    config?: Partial<BigcommerceConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    const cfg = commerce.getConfig(config)
    const { data } = await cfg.fetch<GetSiteInfoQuery>(query)
    const categories = data.site.categoryTree.map(normalizeCategory)
    const brands = data.site?.brands?.edges

    return {
      categories: categories ?? [],
      brands: filterEdges(brands),
    }
  }

  return getSiteInfo
}
