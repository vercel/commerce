import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import type {
  Category,
  GetSiteInfoOperation,
} from '@vercel/commerce/types/site'
import type {
  ITaxons,
  TaxonAttr,
} from '@spree/storefront-api-v2-sdk/types/interfaces/Taxon'
import { requireConfigValue } from '../../isomorphic-config'
import type { SpreeSdkVariables } from '../../types'
import type { SpreeApiConfig, SpreeApiProvider } from '..'

const taxonsSort = (spreeTaxon1: TaxonAttr, spreeTaxon2: TaxonAttr): number => {
  const { left: left1, right: right1 } = spreeTaxon1.attributes
  const { left: left2, right: right2 } = spreeTaxon2.attributes

  if (right1 < left2) {
    return -1
  }

  if (right2 < left1) {
    return 1
  }

  return 0
}

export type GetSiteInfoResult<
  T extends { categories: any[]; brands: any[] } = {
    categories: Category[]
    brands: any[]
  }
> = T

export default function getSiteInfoOperation({
  commerce,
}: OperationContext<SpreeApiProvider>) {
  async function getSiteInfo<T extends GetSiteInfoOperation>(opts?: {
    config?: Partial<SpreeApiConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getSiteInfo<T extends GetSiteInfoOperation>(
    opts: {
      config?: Partial<SpreeApiConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getSiteInfo<T extends GetSiteInfoOperation>({
    query,
    variables: getSiteInfoVariables = {},
    config: userConfig,
  }: {
    query?: string
    variables?: any
    config?: Partial<SpreeApiConfig>
    preview?: boolean
  } = {}): Promise<GetSiteInfoResult> {
    console.info(
      'getSiteInfo called. Configuration: ',
      'query: ',
      query,
      'getSiteInfoVariables ',
      getSiteInfoVariables,
      'config: ',
      userConfig
    )

    const createVariables = (parentPermalink: string): SpreeSdkVariables => ({
      methodPath: 'taxons.list',
      arguments: [
        {
          filter: {
            parent_permalink: parentPermalink,
          },
        },
      ],
    })

    const config = commerce.getConfig(userConfig)
    const { fetch: apiFetch } = config // TODO: Send config.locale to Spree.

    const { data: spreeCategoriesSuccessResponse } = await apiFetch<
      ITaxons,
      SpreeSdkVariables
    >('__UNUSED__', {
      variables: createVariables(
        requireConfigValue('categoriesTaxonomyPermalink') as string
      ),
    })

    const { data: spreeBrandsSuccessResponse } = await apiFetch<
      ITaxons,
      SpreeSdkVariables
    >('__UNUSED__', {
      variables: createVariables(
        requireConfigValue('brandsTaxonomyPermalink') as string
      ),
    })

    const normalizedCategories: GetSiteInfoOperation['data']['categories'] =
      spreeCategoriesSuccessResponse.data
        .sort(taxonsSort)
        .map((spreeTaxon: TaxonAttr) => {
          return {
            id: spreeTaxon.id,
            name: spreeTaxon.attributes.name,
            slug: spreeTaxon.id,
            path: `/${spreeTaxon.id}`,
          }
        })

    const normalizedBrands: GetSiteInfoOperation['data']['brands'] =
      spreeBrandsSuccessResponse.data
        .sort(taxonsSort)
        .map((spreeTaxon: TaxonAttr) => {
          return {
            id: spreeTaxon.id,
            path: `/${spreeTaxon.id}`,
            slug: spreeTaxon.id,
            name: spreeTaxon.attributes.name,
          }
        })

    return {
      categories: normalizedCategories,
      brands: normalizedBrands,
    }
  }

  return getSiteInfo
}
