import { SwellConfig } from '../api'

export type Category = {
  entityId: string
  name: string
  path: string
}

const getCategories = async (config: SwellConfig): Promise<Category[]> => {
  const data = await config.fetch('categories', 'get')
  return (
    data.results.map(({ id: entityId, name, slug }: any) => ({
      entityId,
      name,
      path: `/${slug}`,
    })) ?? []
  )
}

export default getCategories
