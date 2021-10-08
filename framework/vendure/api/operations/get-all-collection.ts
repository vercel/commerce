import { OperationContext } from '@commerce/api/operations'
import { Collection } from '@commerce/types/collection'
import { Provider, VendureConfig } from '..'
import { GetAllCollectionsQuery } from '../../schema'
import { getAllCollectionsQuery } from '../../utils/queries/get-all-collections-query'

export type CollectionVariables = { first?: number }

export default function getAllCollectionsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllCollections(opts?: {
    variables?: CollectionVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<{ collections: Collection[] }>

  async function getAllCollections({
    query = getAllCollectionsQuery,
    variables: { ...vars } = {},
    config: cfg,
  }: {
    query?: string
    variables?: CollectionVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  } = {}): Promise<{ collections: Collection[] | any[] }> {
    const config = commerce.getConfig(cfg)
    const variables = {
      input: {
        take: vars.first,
        groupByCollection: true,
      },
    }
    const { data } = await config.fetch<GetAllCollectionsQuery>(query, {
      variables,
    })

    return {
      collections: data.collections.items,
    }
  }

  return getAllCollections
}
