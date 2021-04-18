import { Product } from '@commerce/types'

import api from '../api/product'

interface GetProducts {
  products: Product[]
}

interface Parameters {
  variables: {
    slug?: string
  }
  preview?: boolean
}

const getAllProducts = async (
  _parameters: Parameters
): Promise<GetProducts> => {
  return {
    products: await api.list(),
  }
}

export default getAllProducts
