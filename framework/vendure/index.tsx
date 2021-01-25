import * as React from 'react'
import { ReactNode } from 'react'
import { CommerceConfig, CommerceProvider as CoreCommerceProvider, useCommerce as useCoreCommerce } from '@commerce'
import { FetcherError } from '@commerce/utils/errors'

async function getText(res: Response) {
  try {
    return (await res.text()) || res.statusText
  } catch (error) {
    return res.statusText
  }
}

async function getError(res: Response) {
  if (res.headers.get('Content-Type')?.includes('application/json')) {
    const data = await res.json()
    return new FetcherError({ errors: data.errors, status: res.status })
  }
  return new FetcherError({ message: await getText(res), status: res.status })
}

export const vendureConfig: CommerceConfig = {
  locale: 'en-us',
  cartCookie: 'bc_cartId',
  async fetcher({ url, method = 'POST', variables, query, body: bodyObj }) {
    const shopApiUrl = process.env.NEXT_PUBLIC_VENDURE_SHOP_API_URL
    if (!shopApiUrl) {
      throw new Error('The Vendure Shop API url has not been provided. Please define NEXT_PUBLIC_VENDURE_SHOP_API_URL in .env.local')
    }
    const hasBody = Boolean(variables || query)
    const body = hasBody
      ? JSON.stringify({ query, variables })
      : undefined
    const headers = hasBody ? { 'Content-Type': 'application/json' } : undefined
    const res = await fetch(shopApiUrl, {
      method,
      body,
      headers,
      credentials: 'include'
    })

    if (res.ok) {
      const { data } = await res.json()
      return data
    }

    throw await getError(res)
  },
}

export type VendureConfig = Partial<CommerceConfig>

export type VendureProps = {
  children?: ReactNode
  locale: string
} & VendureConfig

export function CommerceProvider({ children, ...config }: VendureProps) {
  return (
    <CoreCommerceProvider config={{ ...vendureConfig, ...config }}>
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce()
