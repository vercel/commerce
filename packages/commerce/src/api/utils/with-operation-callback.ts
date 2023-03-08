import type { AllowedOperations, Operation } from '../operations'

import { z } from 'zod'
import { getOperationError } from './errors'
import { pageSchema } from '../../schemas/page'
import { siteInfoSchema } from '../../schemas/site'
import { productSchema, productsPathsSchema } from '../../schemas/product'

export const withOperationCallback =
  (name: AllowedOperations, fn: (...args: any[]) => Promise<any>) =>
  async (...args: any[]) => {
    try {
      const data = await fn(...args)
      parse({ name, data })
      return data
    } catch (error) {
      throw getOperationError(name, error)
    }
  }

const parse = ({ name, data }: Operation) => {
  switch (name) {
    case 'getProduct':
      productSchema.optional().parse(data.product)
      break
    case 'getAllProducts':
      z.array(productSchema).parse(data.products)
      break
    case 'getAllProductPaths':
      productsPathsSchema.parse(data.products)
      break
    case 'getPage':
      pageSchema.nullable().parse(data.page)
      break
    case 'getAllPages':
      z.array(pageSchema).parse(data.pages)
      break
    case 'getSiteInfo':
      siteInfoSchema.parse(data)
      break
  }
}
