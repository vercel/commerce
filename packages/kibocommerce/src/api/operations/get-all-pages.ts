import type { OperationContext } from '@vercel/commerce/api/operations'
import type { KiboCommerceConfig } from '../index'
import { getAllPagesQuery } from '../queries/get-all-pages-query'
import { normalizePage } from '../../lib/normalize'

export type GetAllPagesResult<T extends { pages: any[] } = { pages: any[] }> = T

export default function getAllPagesOperation({
  commerce,
}: OperationContext<any>) {
  async function getAllPages({
    query = getAllPagesQuery,
    config,
  }: {
    url?: string
    config?: Partial<KiboCommerceConfig>
    preview?: boolean
    query?: string
  } = {}): Promise<GetAllPagesResult> {
    const cfg = commerce.getConfig(config)
    const variables = {
      documentListName: cfg.documentListName,
    }
    const { data } = await cfg.fetch(query, { variables })

    const pages = data.documentListDocuments.items.map(normalizePage)

    return { pages }
  }

  return getAllPages
}
