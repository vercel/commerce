import { ShopifyConfig } from '../api'
import type { Category } from '../types/site'
import { CollectionEdge } from '../../schema'
import { normalizeCategory } from '../utils/normalize'
import { getSiteCollectionsQuery } from './queries'

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
