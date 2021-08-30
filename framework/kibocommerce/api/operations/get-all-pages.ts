import type { OperationContext } from '@commerce/api/operations'
// import { QueryPagesArgs, PageCountableEdge } from '../../schema'
// import type { SaleorConfig, Provider } from '..'
// import * as Query from '../../utils/queries'
import type { KiboCommerceConfig } from '../index'
import { documentListDocumentsQuery } from '../queries/getDocumentListDocuments'

export type Page = any

export type GetAllPagesResult<
  T extends { pages: any[] } = { pages: Page[] }
  > = T

export default function getAllPagesOperation({
  commerce,
}: OperationContext<any>) {

  async function getAllPages({
    query = documentListDocumentsQuery,
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
    const { data } = await cfg.fetch(query);

    const pages = data.documentListDocuments.items.map((page: any) => {
      return {
        name: page.name.charAt(0).toUpperCase() + page.name.slice(1),
        url: page.properties.url.split('/')[1],
      }
    });

    return { pages }
  }

  return getAllPages
}