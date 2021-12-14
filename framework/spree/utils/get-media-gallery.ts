// Based on https://github.com/spark-solutions/spree2vuestorefront/blob/d88d85ae1bcd2ec99b13b81cd2e3c25600a0216e/src/utils/index.ts

import type { ProductImage } from '@commerce/types/product'
import type { SpreeProductImage } from '../types'

const getMediaGallery = (
  images: SpreeProductImage[],
  getImageUrl: (
    image: SpreeProductImage,
    minWidth: number,
    minHeight: number
  ) => string | null
) => {
  return images.reduce<ProductImage[]>((productImages, _, imageIndex) => {
    const url = getImageUrl(images[imageIndex], 800, 800)

    if (url) {
      return [...productImages, { url }]
    }

    return productImages
  }, [])
}

export default getMediaGallery
