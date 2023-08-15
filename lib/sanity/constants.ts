// Currency code (ISO 4217) to use when displaying prices in the studio
// https://en.wikipedia.org/wiki/ISO_4217
export const DEFAULT_CURRENCY_CODE = 'SEK'

// Document types which:
// - cannot be created in the 'new document' menu
// - cannot be duplicated, unpublished or deleted
export const LOCKED_DOCUMENT_TYPES = ['settings', 'home', 'media.tag']

// Document types which:
// - cannot be created in the 'new document' menu
// - cannot be duplicated, unpublished or deleted
// - are from the KM-COMMERCE connect app.
export const STORM_DOCUMENT_TYPES = ['product', 'productVariant', 'category']

// References to include in 'internal' links
export const PAGE_REFERENCES = [
  {type: 'category'},
  {type: 'home'},
  {type: 'page'},
  {type: 'product'},
  {type: 'productVariant'},
]

// Objects to include in page building arrays.
export const COMPONENT_REFERENCES = [
  {type: 'hero'},
  {type: 'slider'},
  {type: 'filteredProductList'},
  {type: 'blurbSection'},
  {type: 'uspSection'},
  {type: 'reusableSection'},
]

// API version to use when using the Sanity client within the studio
// https://www.sanity.io/help/studio-client-specify-api-version
export const SANITY_API_VERSION = '2022-10-25'

// Your Shopify store ID.
// This is your unique store URL (e.g. 'my-store-name.myshopify.com').
// Set this to enable helper links in document status banners and shortcut links on products and collections.
export const STORM_STORE_ID = ''

// Project preview URLs
export const localStorefrontUrl = 'http://localhost:3000';
export const localStorefrontPreviewUrl = 'http://localhost:3000/api/preview';
export const publicStorefrontUrl = 'https://km-storefront.vercel.app';
export const publicStorefrontPreviewUrl = 'https://km-storefront.vercel.app/api/preview';