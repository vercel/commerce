import type {
  OperationContext,
  OperationOptions,
} from '@commerce/api/operations'
import type { RecursivePartial, RecursiveRequired } from '../utils/types'
import type { Page, GetAllPagesOperation } from '../../types/page'
import { BigcommerceConfig, Provider } from '..'

function getAllPagesOperation({ commerce }: OperationContext<Provider>) {
  async function getAllPages(opts?: {
    config?: BigcommerceConfig
    preview?: boolean
  }): Promise<GetAllPagesOperation['data']>

  async function getAllPages<T extends GetAllPagesOperation>(
    opts: {
      config?: BigcommerceConfig
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getAllPages({
    config,
    preview,
  }: {
    url?: string
    config?: BigcommerceConfig
    preview?: boolean
  } = {}): Promise<GetAllPagesOperation['data']> {
    config = commerce.getConfig(config)
    // RecursivePartial forces the method to check for every prop in the data, which is
    // required in case there's a custom `url`
    const { data } = await config.storeApiFetch<
      RecursivePartial<{ data: Page[] }>
    >('/v3/content/pages')
    const pages = (data as RecursiveRequired<typeof data>) ?? []

    return {
      pages: preview ? pages : pages.filter((p) => p.is_visible),
    }
  }

  return getAllPages
}

export default getAllPagesOperation
