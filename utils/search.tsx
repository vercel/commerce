import { useEffect, useState } from 'react'

export function useSearchMeta(asPath: string) {
  const [category, setCategory] = useState<string | undefined>()
  const [brand, setBrand] = useState<string | undefined>()

  useEffect(() => {
    const parts = asPath.split('/')

    let c = parts[2]
    let b = parts[3]

    if (c === 'designers') {
      c = parts[4]
    }

    if (c !== category) setCategory(c)
    if (b !== brand) setBrand(b)
  }, [asPath])

  return { category, brand }
}

// Removes empty query parameters from the query object
export const filterQuery = (query: any) =>
  Object.keys(query).reduce<any>((obj, key) => {
    if (query[key]?.length) {
      obj[key] = query[key]
    }
    return obj
  }, {})

// Remove trailing and leading slash
export const getSlug = (path: string) => path.replace(/^\/|\/$/g, '')

export const getCategoryPath = (slug: string, brand?: string) =>
  `/search${brand ? `/designers/${brand}` : ''}${slug ? `/${slug}` : ''}`

export const getDesignerPath = (slug: string, category?: string) => {
  const designer = slug.replace(/^brands/, 'designers')

  return `/search${designer ? `/${designer}` : ''}${
    category ? `/${category}` : ''
  }`
}
