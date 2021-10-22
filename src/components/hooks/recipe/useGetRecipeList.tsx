import { GetAllRecipesQuery,QueryRecipes, RecipeList } from '@framework/schema'
import { normalizeRecipeList } from '@framework/utils/normalize'
import { getAllBlogsQuery } from '@framework/utils/queries/get-all-blog-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const useGetRecipeList = (options?: QueryRecipes) => {
  const { data, isValidating, ...rest } = useSWR<GetAllRecipesQuery>([getAllBlogsQuery, options], gglFetcher)

  return { 
          reicpes: data?.blogs?.items?.map((recipe:RecipeList)=>normalizeRecipeList(recipe)),
          totalItems: data?.blogs?.totalItems || null,
          loading: isValidating,
           ...rest 
        }
}

export default useGetRecipeList
