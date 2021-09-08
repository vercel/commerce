import type { RequestInit, Response } from '@vercel/fetch'
import type { KiboCommerceConfig } from '../index'
import fetch from './fetch'

const fetchStoreApi = <T>(getConfig: () => KiboCommerceConfig) => async (
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const config = getConfig()
  let res: Response
  try {
    res = await fetch(config.apiHost + endpoint, {
      ...options,
      headers: {
        ...options?.headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiToken}`,
      },
    })
  } catch (error: any) {
    throw new Error(`Fetch to Kibocommerce failed: ${error.message}`)
  }

  const contentType = res.headers.get('Content-Type')
  const isJSON = contentType?.includes('application/json')

  if (!res.ok) {
    const data = isJSON ? await res.json() : await getTextOrNull(res)
    const headers = getRawHeaders(res)
    const msg = `Kibo Commerce API error (${
      res.status
    }) \nHeaders: ${JSON.stringify(headers, null, 2)}\n${
      typeof data === 'string' ? data : JSON.stringify(data, null, 2)
    }`

  }

  // If something was removed, the response will be empty
  return res.status === 200 && (await res.json())
}
export default fetchStoreApi

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
