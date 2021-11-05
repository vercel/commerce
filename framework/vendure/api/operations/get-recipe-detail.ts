import { OperationContext } from '@commerce/api/operations';
import { normalizeRecipe } from '@framework/utils/normalize';
import { RecipeProps } from 'src/utils/types.utils';
import { Provider, VendureConfig } from '..';
import { getRecipeDetailQuery } from '../../utils/queries/get-recipe-detail';
import { GetRecipeQuery } from './../../schema.d';

export type RecipeVariables = {
  slug?: string,
}

export default function getRecipeDetailOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getRecipeDetail(opts?: {
    variables?: RecipeVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<RecipeProps | null>

  async function getRecipeDetail({
    query = getRecipeDetailQuery,
    variables: { ...vars } = {},
    config: cfg,
  }: {
    query?: string
    variables?: RecipeVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  } = {}): Promise<RecipeProps | null> {
    
    const config = commerce.getConfig(cfg)
    const variables = {
      slug: vars.slug
    }
    const { data } = await config.fetch<GetRecipeQuery>(query, {
      variables,
    });
    console.log(data);
    if(data.recipe){

      return normalizeRecipe(data.recipe)

    }else{
      return null
    }
   
  }

  return getRecipeDetail
}
