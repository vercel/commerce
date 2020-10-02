import {
  CommerceProvider as CoreCommerceProvider,
  Connector,
  useCommerce as useCoreCommerce,
} from 'lib/commerce'
import { ReactNode } from 'react'

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

async function fetcher(url: string, query: string) {
  const res = await fetch(url)

  if (res.ok) {
    return res.json()
  }

  throw await getError(res)
}

export const bigcommerce: Connector = {
  locale: 'en-us',
  fetcher,
}

interface Props {
  children?: ReactNode | any
}

// TODO: The connector should be extendable when a developer is using it
export function CommerceProvider({ children }: Props) {
  return (
    <CoreCommerceProvider connector={bigcommerce}>
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce()
