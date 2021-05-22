import type { Wishlist as BCWishlist } from '../../bigcommerce/api/wishlist'
import type { Customer as BCCustomer } from '../../bigcommerce/api/customers'
import type { SearchProductsData as BCSearchProductsData } from '../../bigcommerce/api/catalog/products'

export * from './common'

// TODO: Properly define this type
export interface Wishlist extends BCWishlist {}

// TODO: Properly define this type
export interface Customer extends BCCustomer {}

// TODO: Properly define this type
export interface SearchProductsData extends BCSearchProductsData {}

/**
 * Temporal types
 */

interface Entity {
  id: string | number
  [prop: string]: any
}

export interface Product2 {
  id: string
  name: string
  description: string
  sku?: string
  slug?: string
  path?: string
  images: ProductImage[]
  variants: ProductVariant2[]
  price: ProductPrice
  options: ProductOption[]
}

export interface Product extends Entity {
  name: string
  description: string
  descriptionHtml?: string
  slug?: string
  path?: string
  images: ProductImage[]
  variants: ProductVariant2[]
  price: ProductPrice
  options: ProductOption[]
  sku?: string
}

interface ProductOption extends Entity {
  displayName: string
  values: ProductOptionValues[]
}

interface ProductOptionValues {
  label: string
  hexColors?: string[]
}

interface ProductImage {
  url: string
  alt?: string
}

interface ProductVariant2 {
  id: string | number
  options: ProductOption[]
}

interface ProductPrice {
  value: number
  currencyCode: 'USD' | 'ARS' | string | undefined
  retailPrice?: number
  salePrice?: number
  listPrice?: number
  extendedSalePrice?: number
  extendedListPrice?: number
}
