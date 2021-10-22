import { OperationContext } from '@commerce/api/operations'
import { Provider, VendureConfig } from '..'
import { GetAllRecipesQuery,BlogList,SortRecipes } from '../../schema'
import { getAllBlogsQuery } from '../../utils/queries/get-all-blog-query'

export type RecipesVariables = {
  excludeBlogIds?: string[],
  take?: number,
  sort?: {
    id?: string
  }
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
    query = getAllBlogsQuery,
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
      excludeBlogIds: vars.excludeBlogIds,
      options: {
        take: vars.take,
        sort: {
          id: vars.sort?.id
        }
      },
    }
    const { data } = await config.fetch<GetAllRecipesQuery>(query, {
      variables,
    })
    return {
        recipes: data?.blogs?.items?.map((val:BlogList)=>({
            id: val.id,
            title: val.translations[0]?.title,
            imageSrc: val.featuredAsset?.preview ?? null,
            slug: val.translations[0]?.slug,
            description: val.translations[0]?.description,
            isPublish: val.isPublish,
            isFeatured: val.isFeatured,
            authorName: val.authorName,
            authorAvatarAsset : val.authorAvatarAsset?.preview ?? null,
            createdAt: val.createdAt
        })),
        totalItems: data?.blogs?.totalItems || null
    }
  }

  return getAllRecipes
}
