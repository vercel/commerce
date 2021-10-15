import { OperationContext } from '@commerce/api/operations'
import { Provider, VendureConfig } from '..'
import { GetAllBlogsQuery,BlogList } from '../../schema'
import { getAllBlogsQuery } from '../../utils/queries/get-all-blog-query'

export type BlogVariables = { take?: number,skip?:number }

export default function getAllBlogsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllBlogs(opts?: {
    variables?: BlogVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<{ blogs: GetAllBlogsQuery,totalItems:number }>

  async function getAllBlogs({
    query = getAllBlogsQuery,
    variables: { ...vars } = {},
    config: cfg,
  }: {
    query?: string
    variables?: BlogVariables
    config?: Partial<VendureConfig>
    preview?: boolean
  } = {}): Promise<{ blogs: GetAllBlogsQuery | any[] ,totalItems?:number }> {
    const config = commerce.getConfig(cfg)
    const variables = {
      options: {
        take: vars.take,
        skip: vars.skip,
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
            isHidden: val.isHidden
        })),
        totalItems: data?.blogs?.totalItems || null
    }
  }

  return getAllBlogs
}
