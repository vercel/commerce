import api from '../api/product'

interface CollectionEdge {
  entityId: string
  name: string
  path: string
}

interface GetAllCollections {
  categories: CollectionEdge[]
}

const getAllCollections = async (): Promise<GetAllCollections> => {
  const products = await api.list().then((products) =>
    products.map((product) => ({
      entityId: product.id,
      name: product.name,
      path: product.path,
    }))
  )

  return {
    categories: products as CollectionEdge[],
  }
}

export default getAllCollections
