import { Product } from '@commerce/types'

import { CSVConfig } from '../index'

import mock from './mock'

interface GetProduct {
  product: Product | null
}

interface Parameters {
  variables: {
    slug?: string
  }
  config: CSVConfig
  preview?: boolean
}

const getProduct = async (_parameters: Parameters): Promise<GetProduct> => {
  return {
    product: mock.full,
  }
}

export default getProduct
