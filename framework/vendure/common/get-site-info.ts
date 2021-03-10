import { VendureConfig, getConfig } from '../api'
import { GetCollectionsQuery } from '../schema'
import { arrayToTree } from '../lib/array-to-tree'

export const getCollectionsQuery = /* GraphQL */ `
  query getCollections {
    collections {
      items {
        id
        name
        description
        slug
        productVariants {
          totalItems
        }
        parent {
          id
        }
        children {
          id
        }
      }
    }
  }
`

async function getSiteInfo({
  query = getCollectionsQuery,
  variables,
  config,
}: {
  query?: string
  variables?: any
  config?: VendureConfig
  preview?: boolean
} = {}): Promise<any> {
  config = getConfig(config)
  // RecursivePartial forces the method to check for every prop in the data, which is
  // required in case there's a custom `query`
  const { data } = await config.fetch<GetCollectionsQuery>(query, { variables })
  const categories = arrayToTree(
    data.collections?.items.map((i) => ({
      ...i,
      entityId: i.id,
      path: i.slug,
      productCount: i.productVariants.totalItems,
    }))
  ).children
  const brands = [] as any[]

  return {
    categories: categories ?? [],
    brands,
  }
}

export default getSiteInfo
