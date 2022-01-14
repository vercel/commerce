import type {
  OperationContext,
} from '@commerce/api/operations'
import type { KiboCommerceConfig, KiboCommerceProvider } from '..'
import { normalizePage } from '../../lib/normalize'
import { getPageQuery } from '../queries/get-page-query'
import type { Page, GetPageQueryParams } from "../../types/page";
import type { Document } from '../../schema'

export default function getPageOperation({
  commerce,
}: OperationContext<any>) {
  async function getPage<T extends Page>({
    url,
    variables,
    config,
    preview,
  }: {
    url?: string
    variables: GetPageQueryParams
    config?: Partial<KiboCommerceConfig>
    preview?: boolean
  }): Promise<any> {
    // RecursivePartial forces the method to check for every prop in the data, which is
    // required in case there's a custom `url`
    const cfg = commerce.getConfig(config)
    const pageVariables = { documentListName: cfg.documentListName, filter: `id eq ${variables.id}` }

    const { data } = await cfg.fetch(getPageQuery, { variables: pageVariables })

    const firstPage = data.documentListDocuments.items?.[0];
    const page = firstPage as Document
    if (preview || page?.properties?.is_visible) {
      return { page: normalizePage(page as any) }
    }
    return {}
  }

  return getPage
}