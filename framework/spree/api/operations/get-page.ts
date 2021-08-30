import type { OperationOptions } from '@commerce/api/operations'
import type { GetPageOperation } from '@commerce/types/page'
import type { SpreeApiConfig } from '..'

export type Page = any
export type GetPageResult = { page?: Page }

export type PageVariables = {
  id: number
}

export default function getPageOperation() {
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
    variables,
    config,
    preview,
  }: {
    url?: string
    variables: T['variables']
    config?: Partial<SpreeApiConfig>
    preview?: boolean
  }): Promise<T['data']> {
    return Promise.resolve({})
  }

  return getPage
}
