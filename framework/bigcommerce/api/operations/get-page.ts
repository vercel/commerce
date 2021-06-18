import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
import type { GetPageOperation, Page } from '../../types/page'
import type { RecursivePartial, RecursiveRequired } from '../utils/types'
import type { BigcommerceConfig, Provider } from '..'
import { normalizePage } from '../../lib/normalize'

export default function getPageOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getPage<T extends GetPageOperation>(opts: {
    variables: T['variables']
    config?: Partial<BigcommerceConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getPage<T extends GetPageOperation>(
    opts: {
      variables: T['variables']
      config?: Partial<BigcommerceConfig>
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
    config?: Partial<BigcommerceConfig>
    preview?: boolean
  }): Promise<T['data']> {
    const cfg = commerce.getConfig(config)
    // RecursivePartial forces the method to check for every prop in the data, which is
    // required in case there's a custom `url`
    const { data } = await cfg.storeApiFetch<
      RecursivePartial<{ data: Page[] }>
    >(url || `/v3/content/pages?id=${variables.id}&include=body`)
    const firstPage = data?.[0]
    const page = firstPage as RecursiveRequired<typeof firstPage>

    if (preview || page?.is_visible) {
      return { page: normalizePage(page as any) }
    }
    return {}
  }

  return getPage
}
