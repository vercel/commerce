import { OperationContext } from '@commerce/api/operations';
import { normalizeBlog } from '@framework/utils/normalize';
import { Provider, VendureConfig } from '..';
import { Blog, GetAllBlogsQuery } from '../../schema';
import { getAllBlogsQuery } from '../../utils/queries/get-all-blog-query';

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
      customOptions: {
        take: vars.take
      },
    }
    const { data } = await config.fetch<GetAllBlogsQuery>(query, {
      variables,
    })
  
    if(data){
      return {
        blogs: data?.blogs?.items?.map((val:Blog)=>normalizeBlog(val)),
        totalItems: data?.blogs?.totalItems || null
      }
    }else{
      return {blogs:[]};
    }
  
  }

  return getAllBlogs
}
