import type { ProductSlugAttr } from '../types'

const getProductPath = (partialSpreeProduct: ProductSlugAttr): string => {
  return `/${partialSpreeProduct.attributes.slug}`
}

export default getProductPath
