// Based on https://github.com/spark-solutions/spree2vuestorefront/blob/d88d85ae1bcd2ec99b13b81cd2e3c25600a0216e/src/utils/index.ts

import type { ImageStyle, SpreeProductImage } from '../types'

const getImageUrl = (
  image: SpreeProductImage,
  minWidth: number,
  _: number
): string | null => {
  // every image is still resized in vue-storefront-api, no matter what getImageUrl returns
  if (image) {
    const {
      attributes: { styles },
    } = image
    const bestStyleIndex = styles.reduce(
      (bSIndex: number | null, style: ImageStyle, styleIndex: number) => {
        // assuming all images are the same dimensions, just scaled
        if (bSIndex === null) {
          return 0
        }
        const bestStyle = styles[bSIndex]
        const widthDiff = +bestStyle.width - minWidth
        const minWidthDiff = +style.width - minWidth
        if (widthDiff < 0 && minWidthDiff > 0) {
          return styleIndex
        }
        if (widthDiff > 0 && minWidthDiff < 0) {
          return bSIndex
        }
        return Math.abs(widthDiff) < Math.abs(minWidthDiff)
          ? bSIndex
          : styleIndex
      },
      null
    )

    if (bestStyleIndex !== null) {
      return styles[bestStyleIndex].url
    }
  }
  return null
}

export default getImageUrl
