import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'

import type { ShopifyConfig, Provider } from '..'
import type { GetSiteInfoQueryVariables } from '../../../schema'
import type { GetSiteInfoOperation } from '../../types/site'

import { getBrands, getCategories } from '../../utils'

export const getSiteInfoQuery = /* GraphQL */ `
  query getSiteInfo {
    shop {
      name
    }
  }
`

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
    variables,
  }: {
    query?: string
    config?: Partial<ShopifyConfig>
    preview?: boolean
    variables?: GetSiteInfoQueryVariables
  } = {}): Promise<T['data']> {
    const cfg = commerce.getConfig(config)

    const categoriesPromise = getCategories(cfg)
    const brandsPromise = getBrands(cfg)

    return {
      categories: await categoriesPromise,
      brands: await brandsPromise,
    }
  }

  return getSiteInfo
}
