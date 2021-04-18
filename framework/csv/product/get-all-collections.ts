interface CollectionEdge {
  entityId: string
  name: string
  path: string
}

interface GetAllCollections {
  categories: CollectionEdge[]
}

const getAllCollections = async (): Promise<GetAllCollections> => {
  return {
    categories: [],
  }
}

export default getAllCollections
