import { createClient } from 'next-sanity'
import {
  apiVersion,
  dataset,
  projectId,
  revalidateSecret,
} from './sanity.api'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // If webhook revalidation is setup we want the freshest content, if not then it's best to use the speedy CDN
  useCdn: revalidateSecret ? false : true,
  perspective: 'published',
})