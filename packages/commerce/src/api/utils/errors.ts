import { ZodError } from 'zod'

import type { Response } from '@vercel/fetch'
import { CommerceError } from '../../utils/errors'

export class CommerceAPIError extends Error {
  status: number
  res: Response
  data: any

  constructor(msg: string, res: Response, data?: any) {
    super(msg)
    this.name = 'CommerceApiError'
    this.status = res.status
    this.res = res
    this.data = data
  }
}

export class CommerceNetworkError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'CommerceNetworkError'
  }
}

export const getErrorResponse = (error: unknown) => {
  if (error instanceof CommerceAPIError) {
    return {
      status: error.status || 500,
      data: error.data || null,
      errors: [
        { message: 'An unexpected error ocurred with the Commerce API' },
      ],
    }
  }

  if (error instanceof ZodError) {
    return {
      status: 400,
      data: null,
      errors: error.issues,
    }
  }

  return {
    status: 500,
    data: null,
    errors: [{ message: 'An unexpected error ocurred' }],
  }
}

export const getOperationError = (operation: string, error: unknown) => {
  if (error instanceof ZodError) {
    return new CommerceError({
      code: 'SCHEMA_VALIDATION_ERROR',
      message:
        `The ${operation} operation returned invalid data and has ${
          error.issues.length
        } parse ${error.issues.length === 1 ? 'error' : 'errors'}: \n` +
        error.issues
          .map(
            (e, index) =>
              `Error #${index + 1} ${
                e.path.length > 0 ? `Path: ${e.path.join('.')}, ` : ''
              }Code: ${e.code}, Message: ${e.message}`
          )
          .join('\n'),
    })
  }

  return error
}
