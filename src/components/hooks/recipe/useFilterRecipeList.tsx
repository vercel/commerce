import { GetAllRecipesQuery,QueryRecipes, Recipe } from '@framework/schema'
import { normalizeRecipe } from '@framework/utils/normalize'
import { filterRecipesQuery } from '@framework/utils/queries/filter-recipes-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const useFilterRecipeList = (options?: QueryRecipes) => {
  const { data, isValidating, ...rest } = useSWR<GetAllRecipesQuery>([filterRecipesQuery, options], gglFetcher)
//   console.log(data);
//   console.log(options);
  
  return { 
          reicpesByFilter: data?.recipeCollection?.recipes?.items?.map((recipe:Recipe)=>normalizeRecipe(recipe)),
          totalItems: data?.recipeCollection?.recipes?.totalItems || null,
          loading: isValidating,
           ...rest 
        }
}

export default useFilterRecipeList
