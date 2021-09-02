import type { OperationContext } from '@commerce/api/operations'
import type { Page } from "../../types/page";
import type { KiboCommerceConfig, KiboCommerceProvider } from '../index'
import { getAllPagesQuery } from '../queries/get-all-pages-query'

export type GetAllPagesResult<
  T extends { pages: Page[] } = { pages: Page[] }
  > = T

export default function getAllPagesOperation({
  commerce,
}: OperationContext<KiboCommerceProvider>) {

  async function getAllPages({
    query = getAllPagesQuery,
    config,
    variables,
  }: {
    url?: string
    config?: Partial<KiboCommerceConfig>
    variables?: any
    preview?: boolean
    query?: string
  } = {}): Promise<GetAllPagesResult> {
    const cfg = commerce.getConfig(config)
    variables = {
      documentListName: cfg.documentListName
    }
    const { data } = await cfg.fetch(query, { variables });

    const pages = data.documentListDocuments.items.map((page: any) => {
      return {
        id: page.id,
        name: page.name.charAt(0).toUpperCase() + page.name.slice(1),
        url: page.properties.url,
        body: page.properties.body,
        is_visible: page.properties.is_visible,
        sort_order: page.properties.sort_order
      }
    });

    return { pages }
  }

  return getAllPages
}