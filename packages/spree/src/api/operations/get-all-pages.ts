import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import type { GetAllPagesOperation, Page } from '@vercel/commerce/types/page'
import { requireConfigValue } from '../../isomorphic-config'
import normalizePage from '../../utils/normalizations/normalize-page'
import type { IPages } from '@spree/storefront-api-v2-sdk/types/interfaces/Page'
import type { SpreeSdkVariables } from '../../types'
import type { SpreeApiConfig, SpreeApiProvider } from '../index'

export default function getAllPagesOperation({
  commerce,
}: OperationContext<SpreeApiProvider>) {
  async function getAllPages<T extends GetAllPagesOperation>(options?: {
    config?: Partial<SpreeApiConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getAllPages<T extends GetAllPagesOperation>(
    opts: {
      config?: Partial<SpreeApiConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getAllPages<T extends GetAllPagesOperation>({
    config: userConfig,
    preview,
    query,
    url,
  }: {
    url?: string
    config?: Partial<SpreeApiConfig>
    preview?: boolean
    query?: string
  } = {}): Promise<T['data']> {
    console.info(
      'getAllPages called. Configuration: ',
      'query: ',
      query,
      'userConfig: ',
      userConfig,
      'preview: ',
      preview,
      'url: ',
      url
    )

    const config = commerce.getConfig(userConfig)
    const { fetch: apiFetch } = config

    const variables: SpreeSdkVariables = {
      methodPath: 'pages.list',
      arguments: [
        {
          per_page: 500,
          filter: {
            locale_eq:
              config.locale || (requireConfigValue('defaultLocale') as string),
          },
        },
      ],
    }

    const { data: spreeSuccessResponse } = await apiFetch<
      IPages,
      SpreeSdkVariables
    >('__UNUSED__', {
      variables,
    })

    const normalizedPages: Page[] = spreeSuccessResponse.data.map<Page>(
      (spreePage) =>
        normalizePage(spreeSuccessResponse, spreePage, config.locales || [])
    )

    return { pages: normalizedPages }
  }

  return getAllPages
}
