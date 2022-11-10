import { Page } from '@vercel/commerce/types/page'
import type { SyliusConfig } from '../index'

export default function getAllPagesOperation() {
  async function getAllPages(opts?: {
    config?: Partial<SyliusConfig>
    preview?: boolean
  }): Promise<{ pages: Page[] }> {
    return Promise.resolve({
      pages: [],
    })
  }
  return getAllPages
}
