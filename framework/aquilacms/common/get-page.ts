import { AquilacmsConfig, getConfig } from '../api'
import { Page } from './get-all-pages'
import type { AquilacmsStatic } from '../types'

export type GetPageResult<T extends { page?: any } = { page?: Page }> = T

export type PageVariables = {
  id: string
}

async function getPage(opts: {
  url?: string
  variables: PageVariables
  config?: AquilacmsConfig
  preview?: boolean
}): Promise<GetPageResult>

async function getPage<T extends { page?: any }, V = any>(opts: {
  url: string
  variables: V
  config?: AquilacmsConfig
  preview?: boolean
}): Promise<GetPageResult<T>>

async function getPage({
  url,
  variables: { id },
  config,
  preview,
}: {
  url?: string
  variables: PageVariables
  config?: AquilacmsConfig
  preview?: boolean
}): Promise<GetPageResult> {
  config = getConfig(config)
  const [locale, _id] = id.split('/')
  const lang = locale.split('-')[0]
  // const page: any = await config.storeApiFetch('/v2/category', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     lang,
  //     PostBody: {
  //       filter: {
  //         action: 'page',
  //         _id,
  //       },
  //       limit: 10,
  //       page: 1,
  //     },
  //   }),
  // })
  const staticPage: AquilacmsStatic = await config.storeApiFetch('/v2/static', {
    method: 'POST',
    body: JSON.stringify({
      lang,
      PostBody: {
        filter: {
          _id,
        },
      },
    }),
  })

  return {
    page: {
      id: `${locale}/${staticPage._id}`,
      name: staticPage.slug[lang],
      url: `/${locale}/${staticPage.slug[lang]}`,
      body: staticPage?.content ?? '',
    },
  }
}

export default getPage
