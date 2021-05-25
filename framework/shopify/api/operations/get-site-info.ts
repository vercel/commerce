import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
import { GetSiteInfoQuery, GetSiteInfoQueryVariables } from '@framework/schema'
import type { ShopifyConfig, Provider } from '..'
import { GetSiteInfoOperation } from '../../types/site'

import { getCategories, getBrands, getSiteInfoQuery } from '../../utils'

export default function getSiteInfoOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getSiteInfo<T extends GetSiteInfoOperation>(opts?: {
    config?: Partial<ShopifyConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getSiteInfo<T extends GetSiteInfoOperation>(
    opts: {
      config?: Partial<ShopifyConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getSiteInfo<T extends GetSiteInfoOperation>({
    query = getSiteInfoQuery,
    config,
  }: {
    query?: string
    config?: Partial<ShopifyConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    const cfg = commerce.getConfig(config)

    const categories = await getCategories(cfg)
    const brands = await getBrands(cfg)

    const { data } = await cfg.fetch<
      GetSiteInfoQuery,
      GetSiteInfoQueryVariables
    >(query)

    return {
      categories,
      brands,
    }
  }

  return getSiteInfo
}
