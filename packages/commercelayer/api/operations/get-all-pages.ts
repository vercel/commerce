export type Page = { url: string }
export type GetAllPagesResult = { pages: Page[] }
import type { CommercelayerAPI } from '../index'

export default function getAllPagesOperation() {
  function getAllPages({
    config,
    preview,
  }: {
    url?: string
    config?: Partial<CommercelayerAPI>
    preview?: boolean
  }): Promise<GetAllPagesResult> {
    return Promise.resolve({
      pages: [
        {
          id: 'checkout',
          url: `/en-US/checkout`,
        },
      ],
    })
  }
  return getAllPages
}
