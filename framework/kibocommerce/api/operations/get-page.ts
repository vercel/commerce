import type {
  OperationContext,
} from '@commerce/api/operations'
import type { KiboCommerceConfig, KiboCommerceProvider } from '..'
import { normalizePage } from '../../../bigcommerce/lib/normalize'
import { getPageQuery } from '../queries/get-page-query'

export default function getPageOperation({
  commerce,
}: OperationContext<KiboCommerceProvider>) {
  async function getPage<T extends any>({
    url,
    variables,
    config,
    preview,
  }: {
    url?: string
    variables: any
    config?: Partial<KiboCommerceConfig>
    preview?: boolean
  }): Promise<any> {
    // RecursivePartial forces the method to check for every prop in the data, which is
    // required in case there's a custom `url`
    const cfg = commerce.getConfig(config)
    const pageVariables = { documentListName: cfg.documentListName,  filter: `id eq ${variables.id}`}

    const { data } = await cfg.fetch<any>(getPageQuery, {variables: pageVariables})

    const firstPage = data.documentListDocuments.items?.[0].properties;
    const page = firstPage as any

    if (preview || page?.is_visible) {
      const normalizedPage =  { page: normalizePage(page as any) }
      normalizedPage.page.name = url as string;

      return normalizedPage
    }
    return {}
  }

  return getPage
}