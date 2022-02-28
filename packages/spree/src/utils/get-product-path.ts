import type { ProductSlugAttr } from '../types'

const getProductPath = (partialSpreeProduct: ProductSlugAttr) => {
  return `/${partialSpreeProduct.attributes.slug}`
}

export default getProductPath
