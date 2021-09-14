export type Page = { url: string }
export type GetAllPagesResult = { pages: Page[] }
import type { MedusaConfig } from '..'

export default function getAllPagesOperation() {
  function getAllPages({
    config,
    preview,
  }: {
    url?: string
    config?: Partial<MedusaConfig>
    preview?: boolean
  }): Promise<GetAllPagesResult> {
    return Promise.resolve({
      pages: [],
    })
  }
  return getAllPages
}
