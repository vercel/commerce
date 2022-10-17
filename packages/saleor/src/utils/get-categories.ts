import { Category } from '@vercel/commerce/types/site'
import { SaleorConfig } from '../api'
import { CollectionCountableEdge } from '../../schema'
import * as query from './queries'

const getCategories = async (config: SaleorConfig): Promise<Category[]> => {
  const { data } = await config.fetch(query.CollectionMany, {
    variables: {
      first: 50,
    },
  })

  return (
    data?.collections?.edges?.map(
      ({ node: { id, name, slug } }: CollectionCountableEdge) => ({
        id,
        name,
        slug,
        path: `/${slug}`,
      })
    ) ?? []
  )
}

export default getCategories
