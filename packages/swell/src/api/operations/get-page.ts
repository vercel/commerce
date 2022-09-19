import type { Page } from '../../../schema'
import type { SwellConfig, Provider } from '..'
import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import type { GetPageOperation } from '@vercel/commerce/types/page'

export type GetPageResult<T extends { page?: any } = { page?: Page }> = T

export type PageVariables = {
  id: number
}

export default function getPageOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getPage<T extends GetPageOperation>(opts: {
    variables: T['variables']
    config?: Partial<SwellConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getPage<T extends GetPageOperation>(
    opts: {
      variables: T['variables']
      config?: Partial<SwellConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getPage<T extends GetPageOperation>({
    variables,
    config,
  }: {
    query?: string
    variables: T['variables']
    config?: Partial<SwellConfig>
    preview?: boolean
  }): Promise<T['data']> {
    const { fetch, locale = 'en-US' } = commerce.getConfig(config)
    const id = variables.id
    const result = await fetch('content', 'get', ['pages', id])
    const page = result

    return {
      page: page
        ? {
            ...page,
            url: `/${locale}/${page.slug}`,
            body: page.body ?? '',
          }
        : null,
    }
  }

  return getPage
}
