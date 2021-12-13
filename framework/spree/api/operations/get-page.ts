import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
import type { GetPageOperation } from '@commerce/types/page'
import type { SpreeSdkVariables } from '../../types'
import type { SpreeApiConfig, SpreeApiProvider } from '..'
import type { IPage } from '@spree/storefront-api-v2-sdk/types/interfaces/Page'
import normalizePage from '../../utils/normalizations/normalize-page'

export type Page = any
export type GetPageResult = { page?: Page }

export type PageVariables = {
  id: number
}

export default function getPageOperation({
  commerce,
}: OperationContext<SpreeApiProvider>) {
  async function getPage<T extends GetPageOperation>(opts: {
    variables: T['variables']
    config?: Partial<SpreeApiConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getPage<T extends GetPageOperation>(
    opts: {
      variables: T['variables']
      config?: Partial<SpreeApiConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getPage<T extends GetPageOperation>({
    url,
    config: userConfig,
    preview,
    variables: getPageVariables,
  }: {
    url?: string
    variables: T['variables']
    config?: Partial<SpreeApiConfig>
    preview?: boolean
  }): Promise<T['data']> {
    console.info(
      'getPage called. Configuration: ',
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
      methodPath: 'pages.show',
      arguments: [getPageVariables.id],
    }

    const { data: spreeSuccessResponse } = await apiFetch<
      IPage,
      SpreeSdkVariables
    >('__UNUSED__', {
      variables,
    })

    const normalizedPage: Page = normalizePage(
      spreeSuccessResponse,
      spreeSuccessResponse.data,
      config.locales || []
    )

    return { page: normalizedPage }
  }

  return getPage
}
