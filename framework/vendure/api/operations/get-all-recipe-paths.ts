import { OperationContext, OperationOptions } from '@commerce/api/operations';
import { BigcommerceConfig } from '../../../bigcommerce/api';
import { GetAllRecipePathsOperation } from '../../../commerce/types/recipes';
import type { GetAllRecipePathsQuery, RecipeTranslation } from '../../schema';
import { getAllRecipePathsQuery } from '../../utils/queries/get-all-recipe-paths-query';
import { Provider } from '../index';

export type GetAllBlogPathsResult = {
  recipes: Array<{ node: { path: string } }>
}

export default function getAllRecipePathsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllRecipePaths<
    T extends GetAllRecipePathsOperation
  >(opts?: {
    variables?: T['variables']
    config?: BigcommerceConfig
  }): Promise<T['data']>

  async function getAllRecipePaths<T extends GetAllRecipePathsOperation>(
    opts: {
      variables?: T['variables']
      config?: BigcommerceConfig
    } & OperationOptions
  ): Promise<T['data']>

  async function getAllRecipePaths<T extends GetAllRecipePathsOperation>({
    query = getAllRecipePathsQuery,
    variables,
    config: cfg,
  }: {
    query?: string
    variables?: T['variables']
    config?: BigcommerceConfig
  } = {}): Promise<T['data']> {
    const config = commerce.getConfig(cfg)

    const { data } = await config.fetch<GetAllRecipePathsQuery>(query, {
      variables,
    })

    const recipes = data.recipes.items;
 
    return {
      recipes: recipes?.map(val=>val.translations.map((p:RecipeTranslation) => ({ path: `/${p.slug}` })))
    }
  }

  return getAllRecipePaths
}
