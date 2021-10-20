import { OperationContext } from '@commerce/api/operations'
import { Provider, VendureConfig } from '..'
import { BlogList,GetRelevantBlogsQuery } from '../../schema'
import { getRelevantBlogsQuery } from '../../utils/queries/get-relevant-blogs'

export type BlogVariables = {
    productId?: number,
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
    }
    const { data } = await config.fetch<GetRelevantBlogsQuery>(query, {
      variables,
    })
    return {
        relevantBlogs: data?.relevantBlogs?.items?.map((val:BlogList)=>({
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
    }
  }

  return getRelevantBlogs
}
