import type { Response } from '@vercel/fetch'
import { CommerceError } from '../../utils/errors'

import { ZodError } from 'zod'

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

export const normalizeZodIssues = (issues: ZodError['issues']) =>
  issues.map(({ path, message }) => `${message} at "${path.join('.')}"`)

export const getOperationError = (operation: string, error: unknown) => {
  if (error instanceof ZodError) {
    return new CommerceError({
      code: 'SCHEMA_VALIDATION_ERROR',
      message:
        `Validation ${
          error.issues.length === 1 ? 'error' : 'errors'
        } at "${operation}" operation: \n` +
        normalizeZodIssues(error.issues).join('\n'),
    })
  }
  return error
}

export const normalizeError = (error: unknown) => {
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
      message:
        'Validation error, please check the input data check errors property for more info',
      errors: normalizeZodIssues(error.issues).map((message) => ({ message })),
    }
  }

  return {
    status: 500,
    data: null,
    errors: [{ message: 'An unexpected error ocurred' }],
  }
}
