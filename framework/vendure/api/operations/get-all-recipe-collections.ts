import { OperationContext } from '@commerce/api/operations'
import { Collection } from '@commerce/types/collection'
import { Provider, VendureConfig } from '..'
import { GetAllRecipeCollectionsQuery } from '../../schema'
import { getAllRecipeCollectionsQuery } from '../../utils/queries/get-all-recipe-collections-query'

export type CollectionVariables = { first?: number }

export default function getAllRecipeCollectionsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllRecipeCollections(opts?: {
    variables?: CollectionVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<{ recipeCollections: Collection[] }>

  async function getAllRecipeCollections({
    query = getAllRecipeCollectionsQuery,
    variables: { ...vars } = {},
    config: cfg,
  }: {
    query?: string
    variables?: CollectionVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  } = {}): Promise<{ recipeCollections: Collection[] | any[] }> {
    const config = commerce.getConfig(cfg)
    const variables = {
      input: {
        take: vars.first,
        groupByCollection: true,
      },
    }
    const { data } = await config.fetch<GetAllRecipeCollectionsQuery>(query, {
      variables,
    })

    return {
        recipeCollections: data.recipeCollections.items.map(val=>({
          name:val.name,
          value:val.slug
        })),
    }
  }

  return getAllRecipeCollections
}
