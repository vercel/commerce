import { OperationContext } from '@commerce/api/operations'
import { RecipeCollection } from '@commerce/types/recipe-collection'
import { normalizeRecipe } from '@framework/utils/normalize'
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
  }): Promise<{ recipeCollections: RecipeCollection[] }>

  async function getAllRecipeCollections({
    query = getAllRecipeCollectionsQuery,
    variables: { ...vars } = {},
    config: cfg,
  }: {
    query?: string
    variables?: CollectionVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  } = {}): Promise<{ recipeCollections: RecipeCollection[] | any[] }> {
    const config = commerce.getConfig(cfg)
    const variables = {
      options: {
        take: vars.first,
        // groupByCollection: true,
      },
    }
    const { data } = await config.fetch<GetAllRecipeCollectionsQuery>(query, {
      variables,
    })

    return {
        recipeCollections: data.recipeCollections.items.map((collection)=>{
          return {...collection, recipes:{items:collection.recipes.items.map((recipe)=>normalizeRecipe(recipe))}}
        }),
    }
  }

  return getAllRecipeCollections
}
