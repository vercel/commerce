import { ValidationError } from '@commerce/utils/errors'

import {
  CheckoutErrorCode,
  CheckoutUserError,
  CustomerErrorCode,
  CustomerUserError,
} from '../schema'

export type UserErrors = Array<CheckoutUserError | CustomerUserError>

export type UserErrorCode =
  | CustomerErrorCode
  | CheckoutErrorCode
  | null
  | undefined

const getCustomMessage = (code: UserErrorCode, message: string) => {
  switch (code) {
    case 'UNIDENTIFIED_CUSTOMER':
      message = 'Cannot find an account that matches the provided credentials'
      break
  }
  return message
}

export const throwUserErrors = (errors?: UserErrors) => {
  if (errors && errors.length) {
    throw new ValidationError({
      errors: errors.map(({ code, message }) => ({
        code: code ?? 'validation_error',
        message: getCustomMessage(code, message),
      })),
    })
  }
}

export default throwUserErrors
