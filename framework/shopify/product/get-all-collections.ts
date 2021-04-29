import { GetSiteCollectionsQuery } from '../schema'
import { getConfig, ShopifyConfig } from '../api'
import getAllCollectionsQuery from '../utils/queries/get-all-collections-query'

const getAllCollections = async (options?: {
  variables?: any
  config: ShopifyConfig
  preview?: boolean
}) => {
  let { config, variables = { first: 250 } } = options ?? {}
  config = getConfig(config)

  const { data } = await config.fetch<GetSiteCollectionsQuery>(
    getAllCollectionsQuery,
    { variables }
  )

  const categories = data.collections.edges.map(
    ({ node: { id: entityId, title: name, handle } }) => ({
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
