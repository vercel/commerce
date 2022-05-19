import type {
  OperationContext,
  OperationOptions,
} from '@vercel/commerce/api/operations'
import { GetPageOperation } from '../../types/page'
import { Provider, OpenCommerceConfig } from '..'

type Page = any
type GetPageResult = { page?: Page }

export default function getPageOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getPage<T extends GetPageOperation>(opts: {
    variables: T['variables']
    config?: Partial<OpenCommerceConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getPage<T extends GetPageOperation>(
    opts: {
      variables: T['variables']
      config?: Partial<OpenCommerceConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  function getPage(): Promise<GetPageResult> {
    return Promise.resolve({})
  }
  return getPage
}
