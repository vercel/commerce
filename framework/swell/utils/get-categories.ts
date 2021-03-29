import { SwellConfig } from '../api'

export type Category = {
  id: string
  name: string
  slug: string
}

const getCategories = async (config: SwellConfig): Promise<Category[]> => {
  const data = await config.fetchSwell('categories', 'get')
  return (
    data.results.map(({ id: entityId, name, slug }: Category) => ({
      entityId,
      name,
      path: `/${slug}`,
    })) ?? []
  )
}

export default getCategories
