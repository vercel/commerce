import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import { GetSiteInfoQueryVariables } from '../../../schema'
import type { ShopifyConfig, Provider } from '..'
import { GetSiteInfoOperation } from '@vercel/commerce/types/site'

import { getCategories, getBrands } from '../../utils'

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
    config,
  }: {
    query?: string
    config?: Partial<ShopifyConfig>
    preview?: boolean
    variables?: GetSiteInfoQueryVariables
  } = {}): Promise<T['data']> {
    const cfg = commerce.getConfig(config)

    const categoriesPromise = getCategories(cfg)
    const brandsPromise = getBrands(cfg)

    const [categories, brands] = await Promise.all([
      categoriesPromise,
      brandsPromise,
    ])

    return {
      categories,
      brands,
    }
  }

  return getSiteInfo
}
