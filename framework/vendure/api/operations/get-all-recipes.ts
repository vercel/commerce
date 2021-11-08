import { normalizeRecipes } from '@framework/utils/normalize';
import { Recipe } from './../../schema.d';
import { OperationContext } from '@commerce/api/operations'
import { Provider, VendureConfig } from '..'
import {  GetAllRecipesQuery } from '../../schema'
import { getAllRecipesQuery } from '../../utils/queries/get-all-recipes-query'

export type RecipesVariables = {
  take?:number,
}

export default function getAllRecipesOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllRecipes(opts?: {
    variables?: RecipesVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<{ recipes: GetAllRecipesQuery[],totalItems:number }>

  async function getAllRecipes({
    query = getAllRecipesQuery,
    variables: { ...vars } = {},
    config: cfg,
  }: {
    query?: string
    variables?: RecipesVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  } = {}): Promise<{ recipes: GetAllRecipesQuery[] | any[] ,totalItems?:number }> {
    
    const config = commerce.getConfig(cfg)
    const variables = {
      options: {
        take: vars.take
      },
    }
  
    const { data } = await config.fetch<GetAllRecipesQuery>(query, {
      variables,
    })

    
    if(data){
      return {
        recipes: data?.recipes?.items?.map((val:Recipe)=>normalizeRecipes(val)),
        totalItems: data?.recipes?.totalItems || null
      }
    }else{
      return {recipes:[]};
    }
  
  }

  return getAllRecipes
}
