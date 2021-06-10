import { Category } from '@commerce/types/site'
import { SaleorConfig } from '../api'
import { CollectionCountableEdge } from '../schema'
import * as query from './queries'

const getCategories = async (config: SaleorConfig): Promise<Category[]> => {
  const { data } = await config.fetch(query.CollectionMany, {
    variables: {
      first: 100,
    },
  })

  const categories =
    data.collections?.edges?.map(({ node: { id, name, slug } }: CollectionCountableEdge) => ({
      id,
      name,
      slug,
      path: `/${slug}`,
    })) ?? []

  // FIXME temp hack
  const result = categories.sort((a: any, b: any) => a.name.localeCompare(b.name))

  return result
}

export default getCategories
