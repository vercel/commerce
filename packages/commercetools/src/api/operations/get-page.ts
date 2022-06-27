import { CommercetoolsConfig, Provider } from '..'
import {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import { GetPageOperation } from '../../types/page'

export type GetPageResult<T extends { page?: any } = { page?: any }> = T

export type PageVariables = {
  id: number
}

export default function getPageOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getPage<T extends GetPageOperation>(opts: {
    variables: T['variables']
    config?: Partial<CommercetoolsConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getPage<T extends GetPageOperation>(
    opts: {
      variables: T['variables']
      config?: Partial<CommercetoolsConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getPage<T extends GetPageOperation>({
    variables,
    config,
  }: {
    query?: string
    variables: T['variables']
    config?: Partial<CommercetoolsConfig>
    preview?: boolean
  }): Promise<T['data']> {
    return { page: undefined }
  }

  return getPage
}
