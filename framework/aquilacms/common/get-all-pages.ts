import { AquilacmsConfig, getConfig } from '../api'
import type { AquilacmsStatic } from '../types'

export type Page = {
  id: string
  name: string
  url: string
  sort_order?: number
  body: string
}

export type GetAllPagesResult<
  T extends { pages: any[] } = { pages: Page[] }
> = T

async function getAllPages(opts?: {
  config?: AquilacmsConfig
  preview?: boolean
}): Promise<GetAllPagesResult>

async function getAllPages<T extends { pages: any[] }>(opts: {
  url: string
  config?: AquilacmsConfig
  preview?: boolean
}): Promise<GetAllPagesResult<T>>

async function getAllPages({
  config,
  preview,
}: {
  url?: string
  config?: AquilacmsConfig
  preview?: boolean
} = {}): Promise<GetAllPagesResult> {
  config = getConfig(config)
  // const { datas } = await config.storeApiFetch('/v2/categories', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     lang: 'en',
  //     PostBody: {
  //       filter: {
  //         action: 'page',
  //       },
  //       limit: 10,
  //       page: 1,
  //     },
  //   }),
  // })

  const { datas }: { datas: AquilacmsStatic[] } = await config.storeApiFetch(
    '/v2/statics',
    {
      method: 'POST',
      body: JSON.stringify({
        lang: 'en',
        PostBody: {
          limit: 10,
          page: 1,
        },
      }),
    }
  )

  const pages: Page[] = datas.map((s: AquilacmsStatic) => ({
    id: `en-US/${s._id}`,
    name: s.slug['en'],
    url: `/en-US/${s.slug['en']}`,
    body: s.content,
  }))
  return {
    pages,
  }
}

export default getAllPages
