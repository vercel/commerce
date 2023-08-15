import createImageUrlBuilder from '@sanity/image-url'
import { getClient } from './sanity.client'

export const imageBuilder = createImageUrlBuilder(getClient())

export const urlForImage = (source: any) =>
  imageBuilder.image(source).auto('format').fit('crop')
