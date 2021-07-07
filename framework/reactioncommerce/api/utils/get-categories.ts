import { ReactionCommerceConfig } from '../'
import { TagEdge } from '../../schema'
import getTagsQuery from '../../utils/queries/get-all-collections-query'

export type Category = {
  entityId: string
  name: string
  path: string
}

const getCategories = async (
  config: ReactionCommerceConfig
): Promise<TagEdge[]> => {
  const { data } = await config.fetch(getTagsQuery, {
    variables: {
      first: 250,
      shopId: config.shopId,
    },
  })

  return (
    data.tags?.edges?.map(
      ({
        node: { _id: id, displayTitle: name, slug: handle },
      }: TagEdge) => ({
        id,
        name,
        path: `/${handle}`,
        slug: handle,
      })
    ) ?? []
  )
}

export default getCategories
