export type Page = { url: string }
import { OperationContext, OperationOptions } from '@commerce/api/operations'
import { GetAllPagesOperation } from '@commerce/types/page'
import type { SpreeApiConfig, SpreeApiProvider } from '../index'

export default function getAllPagesOperation({
  commerce,
}: OperationContext<SpreeApiProvider>) {
  async function getAllPages<T extends GetAllPagesOperation>(options?: {
    config?: Partial<SpreeApiConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getAllPages<T extends GetAllPagesOperation>(
    opts: {
      config?: Partial<SpreeApiConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getAllPages<T extends GetAllPagesOperation>({
    config,
    preview,
    query,
  }: {
    url?: string
    config?: Partial<SpreeApiConfig>
    preview?: boolean
    query?: string
  } = {}): Promise<T['data']> {
    return {
      pages: [],
    }
  }

  return getAllPages
}
