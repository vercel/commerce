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
  // TODO:
  config = getConfig(config)
  const { datas } = await config.storeApiFetch('/v2/categories', {
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
  })

  return {
    categories: datas.map((c: any) => ({
      path: c.slug['en'],
      entityId: c._id,
      name: c.name,
    })),
    brands: [],
  }
}

export default getSiteInfo
