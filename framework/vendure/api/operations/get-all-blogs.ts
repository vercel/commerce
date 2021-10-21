import { OperationContext } from '@commerce/api/operations'
import { Provider, VendureConfig } from '..'
import { GetAllBlogsQuery,BlogList } from '../../schema'
import { getAllBlogsQuery } from '../../utils/queries/get-all-blog-query'

export type BlogVariables = {
  excludeBlogIds?: string[],
  take?: number,
  skip?:number,
  filter?:{
    isFeatured?:{
      eq?:Boolean
    }
  },
}

export default function getAllBlogsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllBlogs(opts?: {
    variables?: BlogVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<{ blogs: GetAllBlogsQuery[],totalItems:number }>

  async function getAllBlogs({
    query = getAllBlogsQuery,
    variables: { ...vars } = {},
    config: cfg,
  }: {
    query?: string
    variables?: BlogVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  } = {}): Promise<{ blogs: GetAllBlogsQuery[] | any[] ,totalItems?:number }> {
    
    const config = commerce.getConfig(cfg)
    const variables = {
      excludeBlogIds: vars.excludeBlogIds,
      options: {
        take: vars.take,
        filter: {
          isFeatured: vars.filter?.isFeatured
        }
      },
    }
    const { data } = await config.fetch<GetAllBlogsQuery>(query, {
      variables,
    })
    return {
        blogs: data?.blogs?.items?.map((val:BlogList)=>({
            id: val.id,
            title: val.translations[0]?.title,
            imageSrc: val.featuredAsset?.preview ?? null,
            slug: val.translations[0]?.slug,
            description: val.translations[0]?.description,
            isPublish: val.isPublish,
            isFeatured: val.isFeatured,
            authorName: val.authorName,
            authorAvatarAsset : val.authorAvatarAsset?.preview,
            createdAt: val.createdAt
        })),
        totalItems: data?.blogs?.totalItems || null
    }
  }

  return getAllBlogs
}
