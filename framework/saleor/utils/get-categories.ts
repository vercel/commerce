import { SaleorConfig } from '../api'
import { Collection, CollectionCountableEdge } from '../schema'
import { getSiteCollectionsQuery } from './queries/'

export type Category = {
  entityId: string
  name: string
  path: string
}

const getCategories = async (config: SaleorConfig): Promise<Category[]> => {
  const { data } = await config.fetch(getSiteCollectionsQuery, {
    variables: {
      first: 100,
    },
  })

  return (
    data.collections?.edges?.map(
      ({ node: { id: entityId, name, slug } }: CollectionCountableEdge) => ({
        entityId,
        name,
        path: `/${slug}`,
      })
    ) ?? []
  )
}

export default getCategories
