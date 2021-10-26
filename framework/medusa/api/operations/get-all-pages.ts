import type { MedusaConfig } from '..'

import { GetAllPagesOperation } from '@commerce/types/page'

export type Page = { url: string }
export type GetAllPagesResult = { pages: Page[] }

export default function getAllPagesOperation() {
  async function getAllPages<T extends GetAllPagesOperation>({
    config,
    preview,
  }: {
    url?: string
    config?: Partial<MedusaConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    return Promise.resolve({
      pages: [],
    })
  }
  return getAllPages
}
