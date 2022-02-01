import { errors } from '@spree/storefront-api-v2-sdk'

const prettyPrintSpreeSdkErrors = (error: errors.SpreeSDKError): string => {
  let prettyOutput = `Name: ${error.name}\nMessage: ${error.message}`

  if (error instanceof errors.BasicSpreeError) {
    prettyOutput += `\nSpree summary: ${error.summary}`

    if (error instanceof errors.ExpandedSpreeError) {
      prettyOutput += `\nSpree validation errors:\n${JSON.stringify(
        error.errors,
        null,
        2
      )}`
    }
  }

  return prettyOutput
}

export default prettyPrintSpreeSdkErrors
