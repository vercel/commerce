import { ReactionCommerceConfig } from '../api'
import { CollectionEdge, TagEdge } from '../schema'
import getTagsQuery from './queries/get-all-collections-query'

export type Category = {
  entityId: string
  name: string
  path: string
}

const getCategories = async (
  config: ReactionCommerceConfig
): Promise<Tag[]> => {
  const { data } = await config.fetch(getTagsQuery, {
    variables: {
      first: 250,
      shopId: config.shopId,
    },
  })

  return (
    data.tags?.edges?.map(
      ({
        node: { _id: entityId, displayTitle: name, slug: handle },
      }: TagEdge) => ({
        entityId,
        name,
        path: `/${handle}`,
      })
    ) ?? []
  )
}

export default getCategories
