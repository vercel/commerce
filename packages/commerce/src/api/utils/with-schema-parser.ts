import type { AllowedOperations, OperationsData } from '../operations'

import { z } from 'zod'

import { getOperationError } from './errors'
import { pageSchema } from '../../schemas/page'
import { siteInfoSchema } from '../../schemas/site'
import { productSchema, productsPathsSchema } from '../../schemas/product'

export const withSchemaParser =
  (
    operation: AllowedOperations,
    fn: (...args: any[]) => Promise<OperationsData>
  ) =>
  async (...args: any[]) => {
    const result = await fn(...args)

    try {
      parse(operation, result)
    } catch (error) {
      throw getOperationError(operation, error)
    }

    return result
  }

const parse = (operation: AllowedOperations, data: OperationsData) => {
  switch (operation) {
    case 'getProduct':
      productSchema.nullable().parse(data.product)
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
      siteInfoSchema.parse({
        categories: data.categories,
        brands: data.brands,
      })
      break
  }
}
