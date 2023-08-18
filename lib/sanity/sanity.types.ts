import type { Image } from 'sanity'

export interface HomePagePayload {
  content?: []
  title?: string
  _type?: string
  seo?: {
    title?: string;
    description?: string;
    image: Image
  }
}