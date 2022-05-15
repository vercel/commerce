import {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import {
  GetTagsQuery,
  GetAllProductVendorsQuery,
  GetTagsQueryVariables,
  GetAllProductVendorsQueryVariables,
} from '../../../schema'
import getTagsQuery from '../queries/get-tags-query'
import { GetSiteInfoOperation, OCCategory, SiteTypes } from '../../types/site'
import {
  normalizeCategory,
  normalizeNavigation,
  normalizeVendors,
} from '../../utils/normalize'
import type { OpenCommerceConfig, Provider } from '..'
import filterEdges from '../utils/filter-edges'
import getAllProductVendors from '../queries/get-vendors-query'
import getPrimaryShopQuery from '../queries/get-primary-shop-query'

export default function getSiteInfoOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getSiteInfo<T extends GetSiteInfoOperation>(opts?: {
    config?: Partial<OpenCommerceConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getSiteInfo<T extends GetSiteInfoOperation>(
    opts: {
      config?: Partial<OpenCommerceConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getSiteInfo<T extends GetSiteInfoOperation>({
    config: cfg,
  }: {
    query?: string
    config?: Partial<OpenCommerceConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    const { fetch, shopId } = commerce.getConfig(cfg)

    const [categoriesResponse, vendorsResponse, primaryShopResponse] =
      await Promise.all([
        await fetch<GetTagsQuery, GetTagsQueryVariables>(getTagsQuery, {
          variables: { first: 250, shopId },
        }),
        await fetch<
          GetAllProductVendorsQuery,
          GetAllProductVendorsQueryVariables
        >(getAllProductVendors, { variables: { shopIds: [shopId] } }),
        await fetch(getPrimaryShopQuery),
      ])

    const categories = filterEdges(categoriesResponse.data.tags?.edges).map(
      (edge) => normalizeCategory(edge.node! as OCCategory)
    )

    const brands = [
      ...new Set(filterEdges(vendorsResponse.data.vendors?.nodes)),
    ].map(normalizeVendors)

    const navigationItems =
      primaryShopResponse.data.primaryShop.defaultNavigationTree.items ?? []

    return {
      categories,
      brands,
      navigation: normalizeNavigation(navigationItems),
    }
  }

  return getSiteInfo
}
