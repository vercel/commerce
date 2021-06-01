import { getConfig, VendureConfig } from '../api'
import { GetCollectionsQuery } from '../schema'
import { arrayToTree } from '../lib/array-to-tree'
import { getCollectionsQuery } from '../lib/queries/get-collections-query'
import { Category } from '@commerce/types'

export type GetSiteInfoResult<
  T extends { categories: any[]; brands: any[] } = {
    categories: Category[]
    brands: any[]
  }
> = T

async function getSiteInfo({
  query = getCollectionsQuery,
  variables,
  config,
}: {
  query?: string
  variables?: any
  config?: VendureConfig
  preview?: boolean
} = {}): Promise<GetSiteInfoResult> {
  config = getConfig(config)
  // RecursivePartial forces the method to check for every prop in the data, which is
  // required in case there's a custom `query`
  const { data } = await config.fetch<GetCollectionsQuery>(query, { variables })
  const collections = data.collections?.items.map((i) => ({
    ...i,
    entityId: i.id,
    path: i.slug,
    productCount: i.productVariants.totalItems,
  }))
  const categories = arrayToTree(collections).children
  const brands = [] as any[]

  return {
    categories: categories ?? [],
    brands,
  }
}

export default getSiteInfo
