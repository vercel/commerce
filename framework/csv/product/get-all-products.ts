import { Product } from '@commerce/types'
import { CSVConfig } from '../index'

import mock from './mock'

interface GetAllProducts {
  products: Product[]
}

interface Parameters {
  variables: {
    first: number
  }
  config: CSVConfig
  preview?: boolean
}

const getAllProducts = async (
  _parameters: Parameters
): Promise<GetAllProducts> => {
  return {
    products: [mock.full],
  }
}

export default getAllProducts
