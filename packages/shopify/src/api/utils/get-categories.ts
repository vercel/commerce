import { ShopifyConfig } from '..'
import type { Category } from '../../types/site'
import { CollectionEdge } from '../../../schema'
import { normalizeCategory, getSiteCollectionsQuery } from '../../utils'

export const getCategories = async ({
  fetch,
  locale,
}: ShopifyConfig): Promise<Category[]> => {
  const { data } = await fetch(
    getSiteCollectionsQuery,
    {
      variables: {
        first: 250,
      },
    },
    {
      ...(locale && {
        headers: {
          'Accept-Language': locale,
        },
      }),
    }
  )

  return (
    data.collections?.edges?.map(({ node }: CollectionEdge) =>
      normalizeCategory(node)
    ) ?? []
  )
}
