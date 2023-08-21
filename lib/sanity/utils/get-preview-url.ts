// @ts-nocheck
import { isDev, SanityDocument } from 'sanity'
import { localStorefrontPreviewUrl, publicStorefrontPreviewUrl } from '../constants'

const SANITY_STUDIO_API_READ_TOKEN = "skYG2HXNga8uxSL7rFIreJEnP0SdVjCZ2nzB8rUHD4wRWxXPGceXTuR5vCVBP99mWZ9ULhghmpUyX7EtzDmJusSk6Gwvdr3nLAsdWI9ZktIWvSWUNpHbu0Xfrrt0UUaktrLglk7ToABvjXlaPHLpOIR3dnjl4MGByutPmyra0b5t20kgDrmF"

// Customise this function to show the correct URL based on the current document
export default async function getPreviewUrl(doc: SanityDocument) {

  if (isDev) {
    // Home page have no slugs.
    if (!doc.slug) {
      return `${localStorefrontPreviewUrl}?locale=${doc.language}&type=${doc._type}&secret=${SANITY_STUDIO_API_READ_TOKEN}`
    }

    return `${localStorefrontPreviewUrl}?slug=${doc.slug.current}&locale=${doc.language}&type=${doc._type}&secret=${SANITY_STUDIO_API_READ_TOKEN}`
  } else {
    // Home page have no slugs.
    if (!doc.slug) {
      return `${publicStorefrontPreviewUrl}?locale=${doc.language}&type=${doc._type}&secret=${SANITY_STUDIO_API_READ_TOKEN}`
    }

    return `${publicStorefrontPreviewUrl}?slug=${doc.slug.current}&locale=${doc.language}&type=${doc._type}&secret=${SANITY_STUDIO_API_READ_TOKEN}`
  }
}