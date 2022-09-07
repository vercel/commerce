import { z } from 'zod'

import { productSchema } from '../../schemas/product'
import { CommerceError } from '../../utils/errors'

import type { AllowedOperations, OperationsData } from '../operations'

export const withSchemaParser =
  (
    operation: AllowedOperations,
    fn: (...args: any[]) => Promise<OperationsData>
  ) =>
  async (...args: any[]) => {
    try {
      const result = await fn(...args)
      parse(operation, result)
      return result
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new CommerceError({
          code: 'SCHEMA_VALIDATION_ERROR',
          message:
            `The ${operation} opration returned invalid data: \n` +
            error.issues
              .map((e) => `- ${e.path.join('.')}: ${e.message}`)
              .join('\n'),
        })
      } else {
        throw error
      }
    }
  }

const parse = (operation: AllowedOperations, data: OperationsData) => {
  switch (operation) {
    case 'getProduct':
      productSchema.parse(data.product)
      break

    case 'getAllProducts':
      data.products?.forEach((product: any) => productSchema.parse(product))
      break

    case 'getAllProductPaths':
      data.products?.forEach((p) => z.string().parse(p.path))
      break
  }
}
