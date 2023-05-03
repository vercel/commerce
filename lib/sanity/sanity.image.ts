import { sanityClient } from './sanity.client'
import createImageUrlBuilder from '@sanity/image-url'

export const imageBuilder = createImageUrlBuilder(sanityClient)

export const urlForImage = (source: any) =>
  imageBuilder.image(source).auto('format').fit('crop')
