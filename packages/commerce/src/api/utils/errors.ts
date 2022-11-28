import type { NextRequest } from 'next/server'

import { CommerceError } from '../../utils/errors'
import { ZodError } from 'zod'

export class CommerceAPIResponseError extends Error {
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

export class CommerceAPIError extends Error {
  status: number
  code: string
  constructor(
    msg: string,
    options?: {
      status?: number
      code?: string
    }
  ) {
    super(msg)
    this.name = 'CommerceApiError'
    this.status = options?.status || 500
    this.code = options?.code || 'api_error'
  }
}

export class CommerceNetworkError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'CommerceNetworkError'
  }
}

export const normalizeZodIssues = (issues: ZodError['issues']) =>
  issues.map(({ path, message }) =>
    path.length ? `${message} at "${path.join('.')}" field` : message
  )

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

export const normalizeApiError = (error: unknown, req?: NextRequest) => {
  if (error instanceof CommerceAPIResponseError && error.res) {
    return error.res
  }

  req?.url && console.log(req.url)

  if (error instanceof ZodError) {
    const message = 'Validation error, please check the input data!'
    const errors = normalizeZodIssues(error.issues).map((message) => ({
      message,
    }))
    console.error(`${message}\n${errors.map((e) => e.message).join('\n')}`)
    return {
      status: 400,
      data: null,
      errors,
    }
  }

  console.error(error)

  if (error instanceof CommerceAPIError) {
    return {
      errors: [
        {
          message: error.message,
          code: error.code,
        },
      ],
      status: error.status,
    }
  }

  return {
    data: null,
    errors: [{ message: 'An unexpected error ocurred' }],
  }
}
