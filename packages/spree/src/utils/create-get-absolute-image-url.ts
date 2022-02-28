import { SpreeProductImage } from '../types'
import getImageUrl from './get-image-url'

const createGetAbsoluteImageUrl =
  (host: string, useOriginalImageSize: boolean = true) =>
  (
    image: SpreeProductImage,
    minWidth: number,
    minHeight: number
  ): string | null => {
    let url

    if (useOriginalImageSize) {
      url = image.attributes.transformed_url || null
    } else {
      url = getImageUrl(image, minWidth, minHeight)
    }

    if (url === null) {
      return null
    }

    return `${host}${url}`
  }

export default createGetAbsoluteImageUrl
