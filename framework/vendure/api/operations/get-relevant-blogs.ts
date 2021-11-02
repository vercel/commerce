import { OperationContext } from '@commerce/api/operations';
import { normalizeBlog } from '@framework/utils/normalize';
import { Provider, VendureConfig } from '..';
import { Blog, GetRelevantBlogsQuery } from '../../schema';
import { getRelevantBlogsQuery } from '../../utils/queries/get-relevant-blogs';

export type BlogVariables = {
    productId?: number,
    excludeBlogIds?: string[],
}

export default function getRelevantBlogsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getRelevantBlogs(opts?: {
    variables?: BlogVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<{ relevantBlogs: GetRelevantBlogsQuery[]}>

  async function getRelevantBlogs({
    query = getRelevantBlogsQuery,
    variables: { ...vars } = {},
    config: cfg,
  }: {
    query?: string
    variables?: BlogVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  } = {}): Promise<{ relevantBlogs: GetRelevantBlogsQuery[] | any[]  }> {
    
    const config = commerce.getConfig(cfg)
    const variables = {
      productId: vars.productId,
      excludeBlogIds: vars.excludeBlogIds,
    }
    const { data } = await config.fetch<GetRelevantBlogsQuery>(query, {
      variables,
    })
    if(data.relevantBlogs){
      return {
        relevantBlogs: data?.relevantBlogs?.items?.map((val: Blog) => normalizeBlog(val))
      }
    }else{
      return {relevantBlogs:[]}
    }
  }

  return getRelevantBlogs
}
