import { ReactNode } from 'react'
import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from 'lib/commerce'

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
    return data.errors[0]
  }
  return { message: await getText(res) }
}

export const bigcommerceConfig: CommerceConfig = {
  locale: 'en-us',
  async fetcher({ url, query }) {
    const res = await fetch(url!)

    if (res.ok) {
      return res.json()
    }

    throw await getError(res)
  },
}

export type BigcommerceConfig = Partial<CommerceConfig>

export type BigcommerceProps = {
  children?: ReactNode
  config: BigcommerceConfig
}

export function CommerceProvider({ children, config }: BigcommerceProps) {
  return (
    <CoreCommerceProvider config={{ ...config, ...bigcommerceConfig }}>
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce()
