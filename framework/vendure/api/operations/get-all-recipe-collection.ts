import { OperationContext } from './../../../commerce/api/operations';
import { RecipeCollection } from './../../../commerce/types/recipe-collection';
import { GetAllRecipeCollectionsQuery } from '../../schema'
import { getAllRecipeCollectionsQuery } from '../../utils/queries/get-all-recipe-collections-query'
import { Provider, VendureConfig } from '..';
export type CollectionVariables = { first?: number }

export default function getAllRecipeCollectionsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllRecipeCollections(opts?: {
    variables?: CollectionVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<{ collections: RecipeCollection[] }>

  async function getAllRecipeCollections({
    query = getAllRecipeCollectionsQuery,
    variables: { ...vars } = {},
    config: cfg,
  }: {
    query?: string
    variables?: CollectionVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  } = {}): Promise<{ collections: RecipeCollection[] | any[] }> {
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
      collections: data.recipeCollections.items,
    }
  }

  return getAllRecipeCollections
}
