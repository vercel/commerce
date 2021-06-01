import { ShopifyConfig } from '../api'
import { CollectionEdge } from '../schema'
import getSiteCollectionsQuery from './queries/get-all-collections-query'
import { Category } from '@commerce/types'

const getCategories = async ({
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
    data.collections?.edges?.map(
      ({ node: { id, title: name, handle } }: CollectionEdge) => ({
        id,
        name,
        slug: handle,
        path: `/${handle}`,
      })
    ) ?? []
  )
}

export default getCategories
