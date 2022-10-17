import type { CommercejsConfig } from '..'
import { GetAllPagesOperation } from '@vercel/commerce/types/page'

export type Page = { url: string }
export type GetAllPagesResult = { pages: Page[] }

export default function getAllPagesOperation() {
  async function getAllPages<T extends GetAllPagesOperation>({
    config,
    preview,
  }: {
    url?: string
    config?: Partial<CommercejsConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    return Promise.resolve({
      pages: [],
    })
  }
  return getAllPages
}
