import { OperationContext } from '@commerce/api/operations'
import { Provider, VendureConfig } from '..'
import { Blog, BlogList, GetBlogQuery } from '../../schema'
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
  }): Promise<{ blogDetail: Blog}>

  async function getBlogDetail({
    query = getBlogDetailQuery,
    variables: { ...vars } = {},
    config: cfg,
  }: {
    query?: string
    variables?: BlogVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  } = {}): Promise<{ blogDetail: BlogList | any  }> {
    
    const config = commerce.getConfig(cfg)
    const variables = {
      slug: vars.slug
    }
    const { data } = await config.fetch<GetBlogQuery>(query, {
      variables,
    })
    if(data.blog){

      return {
        blogDetail: {
          id:data?.blog?.id ?? null,
          title: data?.blog?.title ?? null,
          imageSrc: data?.blog?.featuredAsset?.preview ?? null,
          slug: data?.blog?.slug ?? null,
          description: data?.blog?.description ?? null,
          isPublish: data?.blog?.isPublish ?? null,
          isFeatured: data?.blog?.isFeatured ?? null,
          authorName: data?.blog?.authorName ?? null,
          authorAvatarAsset : data?.blog?.authorAvatarAsset?.preview ?? null,
          createdAt: data?.blog?.createdAt ?? null,
          relevantProducts: (data?.blog?.relevantProducts || []).map(val=>val.id) ?? null
        }
      }

    }else{
      return {blogDetail:null}
    }
   
  }

  return getBlogDetail
}
