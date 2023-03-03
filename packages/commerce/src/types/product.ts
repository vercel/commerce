import { CustomField, Image, Metafields } from './common'

export interface ProductPrice {
  /**
   * The price after all discounts are applied.
   */
  value: number
  /**
   * The currency code for the price. This is a 3-letter ISO 4217 code.
   * @example USD
   */
  currencyCode?: 'USD' | 'EUR' | 'ARS' | 'GBP' | string
  /**
   * The retail price of the product. This can be used to mark a product as on sale, when `retailPrice` is higher than the price a.k.a `value`.
   */
  retailPrice?: number
}

export interface ProductOption {
  __typename?: 'MultipleChoiceOption'
  /**
   * The unique identifier for the option.
   */
  id: string
  /**
   * The product option’s name.
   * @example `Color` or `Size`
   */
  displayName: string
  /**
   * List of option values.
   * @example `["Red", "Green", "Blue"]`
   */
  values: ProductOptionValues[]
}

export interface ProductOptionValues {
  /**
   * A string that uniquely identifies the option value.
   */
  label: string
  /**
   * List of hex colors used to display the actual colors in the swatches instead of the name.
   */
  hexColors?: string[]
}

export type ProductMetafield = {
  description: string
  id: string
  key: string
  namespace: string
  value: string
  valueType: string
}

export interface ProductVariant {
  listPrice: number | undefined
  /**
   *  The unique identifier for the variant.
   */
  id: string
  /**
   * The SKU (stock keeping unit) associated with the product variant.
   */
  sku?: string
  /**
   * The product variant’s name, or the product's name.
   */
  name?: string
  /**
   * List of product options.
   */
  options: ProductOption[]
  /**
   * The product variant’s price after all discounts are applied.
   */
  price?: ProductPrice
  /**
   * The retail price of the product. This can be used to mark a product as on sale, when `retailPrice` is higher than the `price`.
   */
  retailPrice?: ProductPrice
  /**
   * Indicates if the variant is available for sale.
   */
  availableForSale?: boolean
  /**
   * Whether a customer needs to provide a shipping address when placing an order for the product variant.
   */
  requiresShipping?: boolean
  /**
   * The image associated with the variant.
   */
  image?: Image
}

export interface Product {
  /**
   *  The unique identifier for the product.
   */
  id: string
  /**
   * The name of the product.
   */
  name: string
  /**
   * Stripped description of the product, single line.
   */
  description: string
  /**
   * The description of the product, complete with HTML formatting.
   */
  descriptionHtml?: string
  /**
   * The SKU (stock keeping unit) associated with the product.
   */
  sku?: string
  /**
   * A human-friendly unique string for the product, automatically generated from its title.
   */
  slug?: string
  /**
   * Relative URL on the storefront for the product.
   */
  path?: string
  /**
   * List of images associated with the product.
   */
  images: Image[]
  /**
   * List of custom fields / properties associated with the product.
   * @example
   * customFields: [{
   *   id: '1',
   *   name: 'Warehouse Location',
   *   value: 'Aisle 3, Shelf 5, Bin 6'
   * }]
   */
  customFields?: CustomField[]
  /**
   * Advanced custom fields that can be added to a product. They are used to store additional information about the product, in a structured format, grouped by namespaces.
   * @example
   * {
   *  // Namespace, the container for a set of metadata
   *  reviews: {
   *   // Key of the metafield
   *   rating: {
   *    key: 'rating',
   *    value: 4,
   *    valueHtml: '&#9733;&#9733;&#9733;&#9733;&#9734;',
   *    type: 'integer',
   *    name: 'Rating',
   *  }
   * }
   */
  metafields?: Metafields
  /**
   * List of the product’s variants.
   */
  variants: ProductVariant[]
  /**
   * The product's base price. Could be the minimum value, or default variant price.
   */
  price: ProductPrice
  /**
   * List of product's options.
   */
  options: ProductOption[]
  /**
   * The product’s vendor name.
   */
  vendor?: string
  /**
   * List of product's media
   */
  media: ProductMedia[]
}

export interface SearchProductsBody {
  /**
   * The search query string to filter the products by.
   */
  search?: string
  /**
   * The category ID to filter the products by.
   */
  categoryId?: string
  /**
   * The brand ID to filter the products by.
   */
  brandId?: string
  /**
   * The sort key to sort the products by.
   * @example 'trending-desc' | 'latest-desc' | 'price-asc' | 'price-desc'
   */
  sort?: string
  /**
   * The locale code, used to localize the product data (if the provider supports it).
   */
  locale?: string
}

/**
 * Fetches a list of products based on the given search criteria.
 */
export type SearchProductsHook = {
  data: {
    /**
     * List of products matching the query.
     */
    products: Product[]
    /**
     * Indicates if there are any products matching the query.
     */
    found: boolean
  }
  body: SearchProductsBody
  input: SearchProductsBody
  fetcherInput: SearchProductsBody
}

/**
 * Product API schema
 */

export type ProductsSchema = {
  endpoint: {
    options: {}
    handlers: {
      getProducts: SearchProductsHook
    }
  }
}

/**
 *  Product operations
 */
export type GetAllProductPathsOperation = {
  data: { products: Pick<Product, 'path'>[] }
  variables: { first?: number }
}

export type GetAllProductsOperation = {
  data: { products: Product[] }
  variables: {
    relevance?: 'featured' | 'best_selling' | 'newest'
    ids?: string[]
    first?: number
  }
}

export type MetafieldsIdentifiers = Array<{
  namespace: string
  key: string
}>

export type GetProductOperation = {
  data: { product?: Product }
  variables: {
    slug: string
    /**
     * Metafields identifiers used to fetch the product metafields, represented as an array of objects with the namespace and key.
     *
     * @example
     * withMetafields: [
     *  {namespace: 'reviews', key: 'rating'},
     *  {namespace: 'reviews', key: 'count'},
     * ]
     */
    withMetafields?: MetafieldsIdentifiers
  }
}

export type ProductPreviewMediaImage = {
  altText: string
  height: string
  id: string
  width: string
}

export type ProductMediaSource = {
  filesize: number
  format: string
  mimeType: string
  url: string
}

export type ProductMedia = {
  alt: string
  id: string
  mediaContentType: string
  previewImage: ProductPreviewMediaImage
  sources: ProductMediaSource[]
}
