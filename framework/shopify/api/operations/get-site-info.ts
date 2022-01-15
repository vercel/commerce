import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import { GetSiteInfoQueryVariables } from '../../../schema'
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
    /*
    const { fetch, locale } = cfg
    const { data } = await fetch<GetSiteInfoQuery, GetSiteInfoQueryVariables>(
      query,
      { variables },
      {
        ...(locale && {
          headers: {
            'Accept-Language': locale,
          },
        }),
      }
    )
    */

    return {
      categories: await categoriesPromise,
      brands: await brandsPromise,
    }
  }

  return getSiteInfo
}
