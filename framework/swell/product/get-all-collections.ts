import { CollectionEdge } from '../schema'
import { getConfig, SwellConfig } from '../api'

const getAllCollections = async (options?: {
  variables?: any
  config: SwellConfig
  preview?: boolean
}) => {
  let { config, variables = { limit: 25 } } = options ?? {}
  config = getConfig(config)

  const response = await config.fetch('categories', 'list', { variables })
  const edges = response.results ?? []

  const categories = edges.map(
    ({ node: { id: entityId, title: name, handle } }: CollectionEdge) => ({
      entityId,
      name,
      path: `/${handle}`,
    })
  )

  return {
    categories,
  }
}

export default getAllCollections
