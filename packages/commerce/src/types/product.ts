export interface ProductImage {
  /**
   * The URL of the product image.
   */
  url: string
  /**
   * A word or phrase that describes the content of an image.
   */
  alt?: string
}

export interface ProductPrice {
  /**
   * Decimal price amount. */
  value: number
  /**
   * Currency of the product price. */
  currencyCode?: 'USD' | 'EUR' | 'ARS' | 'GBP' | string
  /**
   *  The retail price of the product. This can be used to mark a product as on sale, when `retailPrice` is higher than the price a.k.a `value`. */
  retailPrice?: number

  extendedSalePrice?: number
  extendedListPrice?: number
}

export interface ProductOption {
  __typename?: 'MultipleChoiceOption'
  /**
   * The option's id. */
  id: string
  /**
   * The option's name. */
  displayName: string
  /**
   * List of option values. */
  values: ProductOptionValues[]
}

export interface ProductOptionValues {
  /**
   * A string that uniquely identifies the option value. */
  label: string
  /**
   * List of hex colors used to display the actual colors in the swatches instead of the name.  */
  hexColors?: string[]
}
export interface ProductVariant {
  /**
   * The variant's id. */
  id: string | number
  /**
   * List of product options. */
  options: ProductOption[]
  /**
   * Indicates if the variant is available for sale. */
  availableForSale?: boolean
}

export interface Product {
  /**
   * The product's id. */
  id: string
  /**
   * The product's name. */
  name: string
  /**
   * Stripped description of the product, single line. */
  description: string
  /**
   * The description of the product, complete with HTML formatting. */
  descriptionHtml?: string
  /**
   * The SKU (stock keeping unit) associated with the product.
   */
  sku?: string
  /**
   * A human-friendly unique string for the product, automatically generated from its title. */
  slug?: string
  /**
   * A human-friendly string for the product, containing U. */
  path?: string
  /**
   * List of images associated with the product. */
  images: ProductImage[]
  /**
   * List of the product’s variants. */
  variants: ProductVariant[]
  /**
   * The product's base price. Could be the minimum value, or default variant price. */
  price: ProductPrice
  /**
   * The product's price. */
  options: ProductOption[]
  /**
   * The product’s vendor name. */
  vendor?: string
}

export interface SearchProductsBody {
  /**
   * The search query string to filter the products by.
   */
  search?: string
  /**
   * The category ID to filter the products by.
   */
  categoryId?: string | number
  /**
   * The brand ID to filter the products by.
   */
  brandId?: string | number
  /**
   * The sort order to sort the products by.
   */
  sort?: string
  /**
   * The locale code, used to localize the product data (if the provider supports it).
   */
  locale?: string
}

export interface SearchProductsHook {
  data: {
    /**
     * List of products matching the query. */
    products: Product[]
    /**
     * Indicates if there are any products matching the query. */
    found: boolean
  }
  body: SearchProductsBody
  /**
   * Indicates if the request is loading. */
  input: SearchProductsBody
  fetcherInput: SearchProductsBody
}

export interface ProductsSchema {
  endpoint: {
    options: {}
    handlers: {
      getProducts: SearchProductsHook
    }
  }
}

export interface GetAllProductPathsOperation {
  data: { products: Pick<Product, 'path'>[] }
  variables: { first?: number }
}

export interface GetAllProductsOperation {
  data: { products: Product[] }
  variables: {
    relevance?: 'featured' | 'best_selling' | 'newest'
    ids?: string[]
    first?: number
  }
}

export interface GetProductOperation {
  /**
   * Returned data from the operation. */
  data: { product?: Product }
  /**
   * The variables to pass to the operation.*/
  variables: { path: string; slug?: never } | { path?: never; slug: string }
}
