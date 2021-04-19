import { CollectionCountableEdge } from '../schema'
import { getConfig, SaleorConfig } from '../api'
import getAllCollectionsQuery from '../utils/queries/get-all-collections-query'

const getAllCollections = async (options?: {
  variables?: any
  config: SaleorConfig
  preview?: boolean
}) => {
  let { config, variables = { first: 100 } } = options ?? {}
  config = getConfig(config)

  const { data } = await config.fetch(getAllCollectionsQuery, { variables })
  const edges = data.collections?.edges ?? []

  const categories = edges.map(
    ({ node: { id: entityId, name, slug } }: CollectionCountableEdge) => ({
      entityId,
      name,
      path: `/${slug}`,
    })
  )

  return {
    categories,
  }
}

export default getAllCollections
