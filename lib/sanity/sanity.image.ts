import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from './sanity.api'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: any) =>
  imageBuilder.image(source).auto('format').fit('crop')
