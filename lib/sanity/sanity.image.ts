import createImageUrlBuilder from '@sanity/image-url'
import { client } from './sanity.client'

export const imageBuilder = createImageUrlBuilder(client)

export const urlForImage = (source: any) =>
  imageBuilder.image(source).auto('format').fit('crop')
