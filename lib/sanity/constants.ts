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