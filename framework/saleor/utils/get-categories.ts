import { SaleorConfig } from '../api'
import { CollectionCountableEdge } from '../schema'
import * as query from './queries';

export type Category = {
  entityId: string
  name: string
  path: string
}

const getCategories = async (config: SaleorConfig): Promise<Category[]> => {
  const { data } = await config.fetch(query.CollectionMany, {
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
