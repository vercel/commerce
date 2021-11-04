import { OperationContext } from '@commerce/api/operations';
import { normalizeBlog } from '@framework/utils/normalize';
import { Provider, VendureConfig } from '..';
import { Blog, GetFeaturedBlogQuery } from '../../schema';
import { getFeatuedBlogsQuery } from '../../utils/queries/get-featued-query';

export type BlogVariables = {
  take?: number,
  skip?:number,
  sort?:{
    updateAt: String
  },
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
    query = getFeatuedBlogsQuery,
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
        sort:{
          updatedAt: vars.sort?.updateAt
        }
      },
    }
    const { data } = await config.fetch<GetFeaturedBlogQuery>(query, {
      variables,
    })
    if(data?.featuredBlogs != null){

      return {
        featuredBlogs: data?.featuredBlogs?.items?.map((val: Blog) => normalizeBlog(val))
      }

    }else{
      
      return {
        featuredBlogs: []
      }
      
    }
  }

  return getFeaturedBlog
}
