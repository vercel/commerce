import { OperationContext } from '@commerce/api/operations'
import { Provider, VendureConfig } from '..'
import { GetFeaturedBlogQuery,BlogList } from '../../schema'
import { getFeatuedBlogQuery } from '../../utils/queries/get-featued-query'

export type BlogVariables = {
  take?: number,
  skip?:number,
  filter?:{
    isFeatured?:{
      eq?:Boolean
    }
  },
}

export default function getFeaturedBlogOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getFeaturedBlog(opts?: {
    variables?: BlogVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<{ featuredBlogs: GetFeaturedBlogQuery[],totalItems:number }>

  async function getFeaturedBlog({
    query = getFeatuedBlogQuery,
    variables: { ...vars } = {},
    config: cfg,
  }: {
    query?: string
    variables?: BlogVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  } = {}): Promise<{ featuredBlogs: GetFeaturedBlogQuery[] | any[] ,totalItems?:number }> {
    const config = commerce.getConfig(cfg)
    const variables = {
      options: {
        take: vars.take,
        filter: {
          isFeatured: vars.filter?.isFeatured
        }
      },
    }
    const { data } = await config.fetch<GetFeaturedBlogQuery>(query, {
      variables,
    })
    return {
      featuredBlogs: data?.featuredBlogs?.items?.map((val:BlogList)=>({
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
        }))
    }
  }

  return getFeaturedBlog
}
