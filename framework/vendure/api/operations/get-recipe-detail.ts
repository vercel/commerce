import { OperationContext } from '@commerce/api/operations'
import { Provider, VendureConfig } from '..'
import { GetRecipeQuery, RecipeList } from '../../schema'
import { getBlogDetailQuery } from '../../utils/queries/get-blog-detail'


export default function getRecipeDetailOperation({
  commerce,
}: OperationContext<Provider>) {
  
  async function getRecipeDetail({
    query = getBlogDetailQuery,
    variables,
    config: cfg,
  }: {
    query?: string
    variables: { slug: string }
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<{recipeDetail: RecipeList | any }> {
    const config = commerce.getConfig(cfg)
    const { data } = await config.fetch<GetRecipeQuery>(query, {
            variables,
          })
    const recipes = data.blog

    if (recipes) {
      return {
        recipeDetail: {
          id: data?.blog?.id,
          title: data?.blog?.translations[0].title,
          imageSrc: data?.blog?.featuredAsset?.preview ?? null,
          slug: data?.blog?.translations[0]?.slug,
          description: data?.blog?.translations[0]?.description,
          isPublish: data?.blog?.isPublish,
          authorName: data?.blog?.authorName,
          authorAvatarAsset : data?.blog?.authorAvatarAsset?.preview,
          createdAt: data?.blog?.createdAt,
          relevantProducts: data?.blog?.relevantProducts.map(val=>val.id)
        }
      }
    }else{
      return {recipeDetail:null}
    }
  }

  return getRecipeDetail
}


// export type RecipeVariables = {
//   slug?: string,
// }

// export default function getRecipeDetailOperation({
//   commerce,
// }: OperationContext<Provider>) {

//   async function getRecipeDetail(opts?: {
//     variables?: RecipeVariables
//     config?: Partial<VendureConfig>
//     preview?: boolean
//   }): Promise<{ recipeDetail: RecipeList}>

//   async function getRecipeDetail({
//     query = getBlogDetailQuery,
//     variables: { ...vars } = {},
//     config: cfg,
//   }: {
//     query?: string
//     variables?: RecipeVariables
//     config?: Partial<VendureConfig>
//     preview?: boolean
//   } = {}): Promise<{ recipeDetail: RecipeList | any  }> {
    
//     const config = commerce.getConfig(cfg)
//     const variables = {
//       slug: vars.slug
//     }
//     const { data } = await config.fetch<GetRecipeQuery>(query, {
//       variables,
//     })
//     return {
//       id: data?.blog?.id,
//       title: data?.blog?.translations[0].title,
//       imageSrc: data?.blog?.featuredAsset?.preview ?? null,
//       slug: data?.blog?.translations[0]?.slug,
//       description: data?.blog?.translations[0]?.description,
//       isPublish: data?.blog?.isPublish,
//       authorName: data?.blog?.authorName,
//       authorAvatarAsset : data?.blog?.authorAvatarAsset?.preview,
//       createdAt: data?.blog?.createdAt,
//       relevantProducts: data?.blog?.relevantProducts.map(val=>val.id)
//     }
//   }

//   return getRecipeDetail
// }
