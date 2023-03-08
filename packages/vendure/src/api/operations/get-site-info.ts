import { Provider, VendureConfig } from '../'
import { GetCollectionsQuery } from '../../../schema'
import { arrayToTree } from '../../utils/array-to-tree'
import { getCollectionsQuery } from '../../utils/queries/get-collections-query'
import { OperationContext } from '@vercel/commerce/api/operations'
import { Category } from '@vercel/commerce/types/site'

export type GetSiteInfoResult<
  T extends { categories: any[]; brands: any[] } = {
    categories: Category[]
    brands: any[]
  }
> = T

export default function getSiteInfoOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getSiteInfo({
    query = getCollectionsQuery,
    variables,
    config: cfg,
  }: {
    query?: string
    variables?: any
    config?: Partial<VendureConfig>
    preview?: boolean
  } = {}): Promise<GetSiteInfoResult> {
    const config = commerce.getConfig(cfg)
    // RecursivePartial forces the method to check for every prop in the data, which is
    // required in case there's a custom `query`
    const { data } = await config.fetch<GetCollectionsQuery>(query, {
      variables,
    })
    const collections = data.collections?.items.map((i) => ({
      ...i,
      id: i.id,
      path: `/${i.id}`,
      productCount: i.productVariants.totalItems,
    }))
    const categories = arrayToTree(collections).children
    const brands = [] as any[]

    return {
      categories: categories ?? [],
      brands,
    }
  }

  return getSiteInfo
}
