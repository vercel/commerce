import type { Provider, SwellConfig } from '..'
import type { OperationContext } from '@vercel/commerce/api/operations'
import type { Page } from '@vercel/commerce/types/page'

export type GetAllPagesResult<T extends { pages: any[] } = { pages: Page[] }> =
  T

export default function getAllPagesOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllPages(opts?: {
    config?: Partial<SwellConfig>
    preview?: boolean
  }): Promise<GetAllPagesResult>

  async function getAllPages<T extends { pages: any[] }>(opts: {
    url: string
    config?: Partial<SwellConfig>
    preview?: boolean
  }): Promise<GetAllPagesResult<T>>

  async function getAllPages({
    config: cfg,
    preview,
  }: {
    url?: string
    config?: Partial<SwellConfig>
    preview?: boolean
  } = {}): Promise<GetAllPagesResult> {
    const config = commerce.getConfig(cfg)
    const { locale, fetch } = config
    const data = await fetch('content', 'list', ['pages'])
    const pages =
      data?.results?.map(
        ({ slug, body, ...rest }: { slug: string; body: string }) => ({
          ...rest,
          url: `/${locale}/${slug}`,
          body: body ?? '',
        })
      ) ?? []
    return {
      pages,
    }
  }

  return getAllPages
}
