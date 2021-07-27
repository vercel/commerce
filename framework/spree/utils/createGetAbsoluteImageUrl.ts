import { SpreeProductImage } from '../types'
import getImageUrl from './getImageUrl'

const createGetAbsoluteImageUrl =
  (host: string) =>
  (
    image: SpreeProductImage,
    minWidth: number,
    minHeight: number
  ): string | null => {
    const url = getImageUrl(image, minWidth, minHeight)

    if (url === null) {
      return null
    }

    return `${host}${url}`
  }

export default createGetAbsoluteImageUrl
