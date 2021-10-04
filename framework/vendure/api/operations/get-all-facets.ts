import { Facet } from '@commerce/types/facet'
import { Provider, VendureConfig } from '../'
import { GetAllFacetsQuery } from '../../schema'
import { normalizeSearchResult } from '../../utils/normalize'
import { getAllFacetsQuery } from '../../utils/queries/get-all-facets-query'
import { OperationContext } from '@commerce/api/operations'

export type FacetVariables = { first?: number }

export default function getAllFacetsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllFacets(opts?: {
    variables?: FacetVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<{ facets: Facet[] }>

  async function getAllFacets({
    query = getAllFacetsQuery,
    variables: { ...vars } = {},
    config: cfg,
  }: {
    query?: string
    variables?: FacetVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  } = {}): Promise<{ facets: Facet[] | any[] }> {
    const config = commerce.getConfig(cfg)
    const variables = {
      input: {
        take: vars.first,
        groupByFacet: true,
      },
    }
    const { data } = await config.fetch<GetAllFacetsQuery>(query, {
      variables,
    })

    return {
      facets: data.search.items.map((item) => normalizeSearchResult(item)),
    }
  }

  return getAllFacets
}
