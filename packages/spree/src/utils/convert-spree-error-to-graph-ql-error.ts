import { FetcherError } from '@vercel/commerce/utils/errors'
import { errors } from '@spree/storefront-api-v2-sdk'

const convertSpreeErrorToGraphQlError = (
  error: errors.SpreeError
): FetcherError => {
  if (error instanceof errors.ExpandedSpreeError) {
    // Assuming error.errors[key] is a list of strings.

    if ('base' in error.errors) {
      const baseErrorMessage = error.errors.base as unknown as string

      return new FetcherError({
        status: error.serverResponse.status,
        message: baseErrorMessage,
      })
    }

    const fetcherErrors = Object.keys(error.errors).map((sdkErrorKey) => {
      const errors = error.errors[sdkErrorKey] as string[]

      // Naively assume sdkErrorKey is a label. Capitalize it for a better
      // out-of-the-box experience.
      const capitalizedSdkErrorKey = sdkErrorKey.replace(/^\w/, (firstChar) =>
        firstChar.toUpperCase()
      )

      return {
        message: `${capitalizedSdkErrorKey} ${errors.join(', ')}`,
      }
    })

    return new FetcherError({
      status: error.serverResponse.status,
      errors: fetcherErrors,
    })
  }

  if (error instanceof errors.BasicSpreeError) {
    return new FetcherError({
      status: error.serverResponse.status,
      message: error.summary,
    })
  }

  return new FetcherError({
    status: error.serverResponse.status,
    message: error.message,
  })
}

export default convertSpreeErrorToGraphQlError
