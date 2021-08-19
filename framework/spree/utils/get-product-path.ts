import type { ProductSlugAttr } from '@framework/types'

const getProductPath = (partialSpreeProduct: ProductSlugAttr): string => {
  return `/${partialSpreeProduct.attributes.slug}`
}

export default getProductPath
