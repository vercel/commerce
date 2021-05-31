import { ShopifyConfig } from '../api'
import { CollectionEdge } from '../schema'
import getSiteCollectionsQuery from './queries/get-all-collections-query'
import { Category } from '@commerce/types'

const getCategories = async (config: ShopifyConfig): Promise<Category[]> => {
  const { data } = await config.fetch(getSiteCollectionsQuery, {
    variables: {
      first: 250,
    },
  })

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
