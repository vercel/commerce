import { CollectionCountableEdge } from '../schema'
import { getConfig, SaleorConfig } from '../api'
import * as query from '../utils/queries'

const getAllCollections = async (options?: {
  variables?: any
  config: SaleorConfig
  preview?: boolean
}) => {
  let { config, variables = { first: 100 } } = options ?? {}
  config = getConfig(config)

  const { data } = await config.fetch(query.CollectionMany, { variables })
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
