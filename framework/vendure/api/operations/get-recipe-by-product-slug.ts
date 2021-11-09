import { normalizeRecipe } from '@framework/utils/normalize';
import { OperationContext } from '@commerce/api/operations'
import { Provider, VendureConfig } from '..'
import { GetRecipeByProductSlugQuery, Recipe } from '../../schema'
import { getRecipeByProductSlugQuery } from '../../utils/queries/get-recipe-by-product-slug-query'

export type GetRecipeByProductSlugVariables = { 
  slug?:string,
  first?: number
}

export default function getRecipeByProductSlugOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getRecipeByProductSlug(opts?: {
    variables?: GetRecipeByProductSlugVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<{ recipeByProductSlug: Recipe[] }>

  async function getRecipeByProductSlug({
    query = getRecipeByProductSlugQuery,
    variables: { ...vars } = {},
    config: cfg,
  }: {
    query?: string
    variables?: GetRecipeByProductSlugVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  } = {}): Promise<{ recipeByProductSlug: Recipe[] | any[] }> {
    const config = commerce.getConfig(cfg)
    const variables = {
      slug:vars.slug,
      options:{
        take: vars.first
      }
    }
    const { data } = await config.fetch<GetRecipeByProductSlugQuery>(query, {
      variables,
    })
   
  
    return {
      recipeByProductSlug:data.recipeByProductSlug.items.map(recipe=>normalizeRecipe(recipe)),
    }
  }

  return getRecipeByProductSlug
}
