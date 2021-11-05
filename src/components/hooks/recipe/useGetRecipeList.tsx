import { FilterRecipesQuery,QueryRecipes, Recipe } from '@framework/schema'
import { normalizeRecipe } from '@framework/utils/normalize'
import { filterRecipesQuery } from '@framework/utils/queries/filter-recipes-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const useGetRecipeList = (options?: QueryRecipes) => {
  const { data, isValidating, ...rest } = useSWR<FilterRecipesQuery>([filterRecipesQuery, options], gglFetcher)
  return { 
          recipes: data?.recipeByCollectionSlug?.items?.map((recipe:Recipe)=>normalizeRecipe(recipe)),
          totalItems: data?.recipeByCollectionSlug?.totalItems || null,
          loading: isValidating,
           ...rest 
        }
}

export default useGetRecipeList
