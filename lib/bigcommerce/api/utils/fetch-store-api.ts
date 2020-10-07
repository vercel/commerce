import { getConfig } from '..'
import { BigcommerceApiError, BigcommerceNetworkError } from './errors'

export default async function fetchStoreApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const config = getConfig()
  let res: Response

  try {
    res = await fetch(config.storeApiUrl + endpoint, {
      ...options,
      headers: {
        ...options?.headers,
        'Content-Type': 'application/json',
        'X-Auth-Token': config.storeApiToken,
        'X-Auth-Client': config.storeApiClientId,
      },
    })
  } catch (error) {
    throw new BigcommerceNetworkError(
      `Fetch to Bigcommerce failed: ${error.message}`
    )
  }

  if (!res.ok) {
    throw new BigcommerceApiError(await getErrorText(res), res)
  }

  const contentType = res.headers.get('Content-Type')

  if (!contentType?.includes('application/json')) {
    throw new BigcommerceApiError(
      `Fetch to Bigcommerce API failed, expected JSON content but found: ${contentType}`,
      res
    )
  }

  // If something was removed, the response will be empty
  return res.status === 204 ? null : await res.json()
}

async function getErrorText(res: Response) {
  return `Big Commerce API error (${res.status}) \n${JSON.stringify(
    getRawHeaders(res)
  )}\n ${await getTextOrNull(res)}`
}

function getRawHeaders(res: Response) {
  const headers: { [key: string]: string } = {}

  res.headers.forEach((value, key) => {
    headers[key] = value
  })

  return headers
}

function getTextOrNull(res: Response) {
  try {
    return res.text()
  } catch (err) {
    return null
  }
}
