import { OperationContext } from '@commerce/api/operations'
import { Facet } from '@commerce/types/facet'
import { Provider, VendureConfig } from '../'
import { FacetFilterParameter, FacetSortParameter, GetAllFacetsQuery } from '../../schema'
import { getAllFacetsQuery } from '../../utils/queries/get-all-facets-query'

export type FacetVariables = { first?: number, filter?: FacetFilterParameter, sort?: FacetSortParameter }

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
      options: {
        take: vars.first,
        filter: vars.filter,
        sort: vars.sort,
      },
    }
    const { data } = await config.fetch<GetAllFacetsQuery>(query, {
      variables,
    })

    return {
      facets: data.facets.items,
    }
  }

  return getAllFacets
}
