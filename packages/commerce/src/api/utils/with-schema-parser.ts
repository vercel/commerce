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
        return Promise.reject(
          new CommerceError({
            code: 'SCHEMA_VALIDATION_ERROR',
            message:
              `The ${operation} opration returned invalid data and has ${
                error.issues.length
              } parse ${error.issues.length === 1 ? 'error' : 'errors'}: \n` +
              error.issues
                .map(
                  (e, index) =>
                    `${index + 1}. Property ${e.path.join('.')} (${e.code}): ${
                      e.message
                    }`
                )
                .join('\n'),
          })
        )
      } else {
        return Promise.reject(error)
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
