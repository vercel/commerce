import type { OperationContext } from '@commerce/api/operations'

import type { GetSiteInfoQuery } from '../../schema'

import type { ShopifyConfig, Provider } from '..'
import { GetSiteInfoOperation } from '../../types/site'

import getSiteInfoQuery from '../../utils/queries/get-site-info-query'
import { getCategories, getVendors } from '@framework/utils'

export default function getSiteInfoOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getSiteInfo<T extends GetSiteInfoOperation>({
    query = getSiteInfoQuery,
    config,
  }: {
    query?: string
    config?: ShopifyConfig
    preview?: boolean
  } = {}): Promise<T['data']> {
    config = commerce.getConfig(config)

    const categories = await getCategories(config)
    const brands = await getVendors(config)

    const { data } = await config.fetch<GetSiteInfoQuery>(query)

    return {
      categories,
      brands,
    }
  }

  return getSiteInfo
}
