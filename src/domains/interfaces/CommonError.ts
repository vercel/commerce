import { ErrorCode } from '../enums/ErrorCode'

// TODO: Can not find
// import { ErrorCode } from '@framework/schema'

export class CommonError {
  message: string = ''

  errorCode: ErrorCode = ErrorCode.UnknownError

  error?: Error

  static create(message: string, errorCode?: ErrorCode): CommonError {
    const error = new CommonError()
    error.message = message
    error.errorCode = errorCode || ErrorCode.UnknownError
    error.error = new Error()
    return error
  }
}
