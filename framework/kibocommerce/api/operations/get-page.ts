import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
// import type { GetPageOperation, Page } from '../../types/page'
// import type { RecursivePartial, RecursiveRequired } from '../utils/types'
import type { KiboCommerceConfig, KiboCommerceProvider } from '..'
import { normalizePage } from '../../../bigcommerce/lib/normalize'

export default function getPageOperation({
  commerce,
}: OperationContext<KiboCommerceProvider>) {
  async function getPage<T extends any>(opts: {
    variables: any
    config?: Partial<KiboCommerceConfig>
    preview?: boolean
  }): Promise<any>

  async function getPage<T extends any>(
    opts: {
      variables: any
      config?: Partial<KiboCommerceConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<any>

  async function getPage<T extends any>({
    url,
    variables,
    config,
    preview,
  }: {
    url?: string
    variables: any
    config?: Partial<KiboCommerceConfig>
    preview?: boolean
  }): Promise<any> {
    // RecursivePartial forces the method to check for every prop in the data, which is
    // required in case there's a custom `url`
    const cfg = commerce.getConfig(config)
    const { data } = await cfg.fetch<
      any
    >(url || `/v3/content/pages?id=${variables.id}&include=body`)
    const firstPage = data?.[0]
    const page = firstPage as any

    if (preview || page?.is_visible) {
      return { page: normalizePage(page as any) }
    }
    return {}
  }

  return getPage
}