import { AquilacmsConfig, getConfig } from '../api'

export type GetSiteInfoResult = { categories: any[]; brands: any[] }

async function getSiteInfo(opts?: {
  variables?: any
  config?: AquilacmsConfig
  preview?: boolean
}): Promise<GetSiteInfoResult>

async function getSiteInfo<T extends GetSiteInfoResult, V = any>(opts: {
  variables?: V
  config?: AquilacmsConfig
  preview?: boolean
}): Promise<GetSiteInfoResult>

async function getSiteInfo({
  variables,
  config,
}: {
  query?: string
  variables?: any
  config?: AquilacmsConfig
  preview?: boolean
} = {}): Promise<GetSiteInfoResult> {
  config = getConfig(config)
  const [p1, p2]: { datas: any[]; count: number }[] = await Promise.all([
    config.storeApiFetch('/v2/categories', {
      method: 'POST',
      body: JSON.stringify({
        lang: 'en',
        PostBody: {
          filter: {
            action: 'catalog',
          },
          limit: 10,
          page: 1,
          structure: {
            code: 1,
            slug: 1,
            name: 1,
          },
        },
      }),
    }),
    // config.storeApiFetch('/v2/trademarks', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     PostBody: {
    //       limit: 10,
    //       structure: {
    //         _id: 1,
    //         name: 1,
    //         code: 1,
    //       },
    //     },
    //   }),
    // }),
  ])

  const categories = p1.datas
  const brands = p2.datas

  return {
    categories: categories.map((c: any) => ({
      path: c.slug['en'],
      entityId: c._id,
      name: c.name,
    })),
    brands: brands.map((b: any) => ({
      node: {
        entityId: b._id,
        path: `brands/${b.code}`,
        name: b.name,
      },
    })),
  }
}

export default getSiteInfo
