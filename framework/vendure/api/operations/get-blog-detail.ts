import { OperationContext } from '@commerce/api/operations'
import { normalizeBlog } from '@framework/utils/normalize'
import { BlogProps } from 'src/utils/types.utils'
import { Provider, VendureConfig } from '..'
import { GetBlogQuery } from '../../schema'
import { getBlogDetailQuery } from '../../utils/queries/get-blog-detail'

export type BlogVariables = {
  slug?: string,
}

export default function getBlogDetailOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getBlogDetail(opts?: {
    variables?: BlogVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<BlogProps | null>

  async function getBlogDetail({
    query = getBlogDetailQuery,
    variables: { ...vars } = {},
    config: cfg,
  }: {
    query?: string
    variables?: BlogVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  } = {}): Promise<BlogProps | null> {
    
    const config = commerce.getConfig(cfg)
    const variables = {
      slug: vars.slug
    }
    const { data } = await config.fetch<GetBlogQuery>(query, {
      variables,
    })
    if(data.blog){

      return normalizeBlog(data.blog)

    }else{
      return null
    }
   
  }

  return getBlogDetail
}
