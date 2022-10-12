import type { OperationContext } from '@vercel/commerce/api/operations'
import type { Provider, SaleorConfig } from '..'
import { QueryPageArgs } from '../../../schema'

import * as Query from '../../utils/queries'

export type Page = any

export type GetPageResult<T extends { page?: any } = { page?: Page }> = T

export default function getPageOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getPage({
    query = Query.PageOne,
    variables,
    config,
  }: {
    query?: string
    variables: QueryPageArgs
    config?: Partial<SaleorConfig>
    preview?: boolean
  }): Promise<GetPageResult> {
    const { fetch, locale = 'en-US' } = commerce.getConfig(config)

    const { data } = await fetch(
      query,
      { variables },
      {
        ...(locale && {
          'Accept-Language': locale,
        }),
      }
    )

    return {
      page:
        data && data.page
          ? {
              ...data.page,
              name: data.page.title,
              body: data.page.content || '',
              url: `/${locale}/${data.page.slug}`,
            }
          : null,
    }
  }

  return getPage
}
