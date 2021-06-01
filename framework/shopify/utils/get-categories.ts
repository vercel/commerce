import { ShopifyConfig } from '../api'
import { CollectionEdge, QueryRoot, QueryRootCollectionsArgs } from '../schema'
import getSiteCollectionsQuery from './queries/get-all-collections-query'

export type Category = {
  entityId: string
  name: string
  path: string
}

const getCategories = async (config: ShopifyConfig): Promise<Category[]> => {
  const { fetch, locale } = config
  const { data } = await fetch<QueryRoot, QueryRootCollectionsArgs>(
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
      ({ node: { id: entityId, title: name, handle } }: CollectionEdge) => ({
        entityId,
        name,
        path: `/${handle}`,
      })
    ) ?? []
  )
}

export default getCategories
