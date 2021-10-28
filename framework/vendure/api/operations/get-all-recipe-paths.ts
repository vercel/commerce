import { BlogList } from '../../schema';
import { OperationContext,OperationOptions } from '@commerce/api/operations';
import { BigcommerceConfig } from '../../../bigcommerce/api';
import type { GetAllRecipePathsQuery,RecipeTranslation } from '../../schema';
import { getAllBlogPathsQuery } from '../../utils/queries/get-all-blog-paths-query';
import { Provider } from '../index';
import { GetAllRecipesPathsOperation } from '../../../commerce/types/recipes';

export type GetAllBlogPathsResult = {
  blogs: Array<{ node: { path: string } }>
}

export default function getAllRecipePathsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllRecipePaths<
    T extends GetAllRecipesPathsOperation
  >(opts?: {
    variables?: T['variables']
    config?: BigcommerceConfig
  }): Promise<T['data']>

  async function getAllRecipePaths<T extends GetAllRecipesPathsOperation>(
    opts: {
      variables?: T['variables']
      config?: BigcommerceConfig
    } & OperationOptions
  ): Promise<T['data']>

  async function getAllRecipePaths<T extends GetAllRecipesPathsOperation>({
    query = getAllBlogPathsQuery,
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

    const recipes = data.blogs.items;
 
    return {
        recipes: recipes?.map(val=>val.translations.map((p:RecipeTranslation) => ({ path: `/${p.slug}` })))
    }
  }

  return getAllRecipePaths
}
