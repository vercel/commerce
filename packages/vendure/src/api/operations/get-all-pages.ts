import { VendureConfig } from '../'
import { OperationContext } from '@vercel/commerce/api/operations'
import { Provider } from '../'

export type Page = any

export type GetAllPagesResult<T extends { pages: any[] } = { pages: Page[] }> =
  T

export default function getAllPagesOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllPages(opts?: {
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<GetAllPagesResult>

  async function getAllPages<T extends { pages: any[] }>(opts: {
    url: string
    config?: Partial<VendureConfig>
    preview?: boolean
  }): Promise<GetAllPagesResult<T>>

  async function getAllPages({
    config: cfg,
    preview,
  }: {
    url?: string
    config?: Partial<VendureConfig>
    preview?: boolean
  } = {}): Promise<GetAllPagesResult> {
    const config = commerce.getConfig(cfg)

    return {
      pages: [],
    }
  }

  return getAllPages
}
