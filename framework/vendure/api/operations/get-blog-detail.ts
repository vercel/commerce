import { OperationContext } from '@commerce/api/operations'
import { Provider, VendureConfig } from '..'
import { GetBlogQuery,BlogList } from '../../schema'
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
  }): Promise<{ blogDetail: BlogList}>

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
    return {
        blogDetail: {
          id:data?.blog?.id,
          title: data?.blog?.translations[0].title,
          imageSrc: data?.blog?.featuredAsset?.preview ?? null,
          slug: data?.blog?.translations[0]?.slug,
          description: data?.blog?.translations[0]?.description,
          isPublish: data?.blog?.isPublish,
          isFeatured: data?.blog?.isFeatured,
          authorName: data?.blog?.authorName,
          authorAvatarAsset : data?.blog?.authorAvatarAsset?.preview,
          createdAt: data?.blog?.createdAt,
          relevantProducts: data?.blog?.relevantProducts.map(val=>val.id)
        }
    }
  }

  return getBlogDetail
}
