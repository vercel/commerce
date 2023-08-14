// @ts-nocheck
import {isDev, SanityDocument} from 'sanity'
import { localStorefrontPreviewUrl, publicStorefrontPreviewUrl } from '../constants'

// Customise this function to show the correct URL based on the current document
export default function getPreviewUrl(doc: SanityDocument) {
  if (isDev) {
    if (!doc.slug) {
      return 
    }

    return `${localStorefrontPreviewUrl}?slug=${doc.slug.current}&locale=${doc.language}&secret=secret&type=${doc._type}`
  } else {
    if (!doc.slug) {
      return 
    }

    return `${publicStorefrontPreviewUrl}?slug=${doc.slug.current}&locale=${doc.language}&secret=secret&type=${doc._type}`
  }
}