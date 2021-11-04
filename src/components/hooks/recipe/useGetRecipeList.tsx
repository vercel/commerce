import { GetAllRecipesQuery,QueryRecipes, Recipe } from '@framework/schema'
import { normalizeRecipe } from '@framework/utils/normalize'
import { getAllRecipesQuery } from '@framework/utils/queries/get-all-recipes-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const useGetRecipeList = (options?: QueryRecipes) => {
  const { data, isValidating, ...rest } = useSWR<GetAllRecipesQuery>([getAllRecipesQuery, options], gglFetcher)

  return { 
          reicpes: data?.recipes?.items?.map((recipe:Recipe)=>normalizeRecipe(recipe)),
          totalItems: data?.recipes?.totalItems || null,
          loading: isValidating,
           ...rest 
        }
}

export default useGetRecipeList
