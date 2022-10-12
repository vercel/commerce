import type { OperationContext } from '@vercel/commerce/api/operations'

import { QueryPagesArgs, PageCountableEdge } from '../../../schema'
import type { SaleorConfig, Provider } from '..'
import * as Query from '../../utils/queries'

export type Page = any

export type GetAllPagesResult<T extends { pages: any[] } = { pages: Page[] }> =
  T

export default function getAllPagesOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllPages({
    query = Query.PageMany,
    config,
    variables,
  }: {
    url?: string
    config?: Partial<SaleorConfig>
    variables?: QueryPagesArgs
    preview?: boolean
    query?: string
  } = {}): Promise<GetAllPagesResult> {
    const { fetch, locale, locales = ['en-US'] } = commerce.getConfig(config)

    const { data } = await fetch(
      query,
      { variables },
      {
        ...(locale && {
          'Accept-Language': locale,
        }),
      }
    )

    const pages =
      data?.pages?.edges?.map(
        ({ node: { title: name, slug, ...node } }: PageCountableEdge) => ({
          id: node.id,
          url: `/${locale}/${slug}`,
          body: node.content || '',
          name,
        })
      ) ?? []

    return { pages }
  }

  return getAllPages
}
