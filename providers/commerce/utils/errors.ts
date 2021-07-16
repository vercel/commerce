export type ErrorData = {
  message: string
  code?: string
}

export type ErrorProps = {
  code?: string
} & (
  | { message: string; errors?: never }
  | { message?: never; errors: ErrorData[] }
)

export class CommerceError extends Error {
  code?: string
  errors: ErrorData[]

  constructor({ message, code, errors }: ErrorProps) {
    const error: ErrorData = message
      ? { message, ...(code ? { code } : {}) }
      : errors![0]

    super(error.message)
    this.errors = message ? [error] : errors!

    if (error.code) this.code = error.code
  }
}

// Used for errors that come from a bad implementation of the hooks
export class ValidationError extends CommerceError {
  constructor(options: ErrorProps) {
    super(options)
    this.code = 'validation_error'
  }
}

export class FetcherError extends CommerceError {
  status: number

  constructor(
    options: {
      status: number
    } & ErrorProps
  ) {
    super(options)
    this.status = options.status
  }
}
