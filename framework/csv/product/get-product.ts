import { Product } from '@commerce/types'

import api from '../api/product'

interface GetProduct {
  product?: Product
}

interface Parameters {
  variables: {
    slug?: string
  }
  preview?: boolean
}

const getProduct = async ({ variables }: Parameters): Promise<GetProduct> => {
  return {
    product: await api.fetch(variables.slug),
  }
}

export default getProduct
