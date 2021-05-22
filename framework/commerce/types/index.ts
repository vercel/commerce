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
