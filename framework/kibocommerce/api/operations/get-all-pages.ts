import type { OperationContext } from '@commerce/api/operations'
import type { KiboCommerceConfig } from '../index'
import { getAllPagesQuery } from '../queries/get-all-pages-query'
import { GetPagesQueryParams } from "../../types/page";

export type GetAllPagesResult<
  T extends { pages: any[] } = { pages: any[] }
  > = T

export default function getAllPagesOperation({
  commerce,
}: OperationContext<any>) {

  async function getAllPages({
    query = getAllPagesQuery,
    config,
    variables,
  }: {
    url?: string
    config?: Partial<KiboCommerceConfig>
    variables?: GetPagesQueryParams
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