export interface Category {
  /**
   * Unique identifier for the category.
   */
  id: string
  /**
   * Name of the category.
   */
  name: string
  /**
   *  A human-friendly unique string for the category, automatically generated from its name.
   * @example "t-shirts"
   */
  slug: string
  /**
   * Relative URL on the storefront for the category.
   * @example /t-shirts
   */
  path: string
}

export interface Brand {
  /**
   * Unique identifier for the brand.
   */
  id: string
  /**
   * Name of the brand.
   */
  name: string
  /**
   *  A human-friendly unique string for the category, automatically generated from its name.
   * @example "acme"
   */
  slug: string
  /**
   * Relative URL on the storefront for this brand.
   * @example "/acme"
   */
  path: string
}

/**
 * Operation to get site information. This includes categories and brands.
 */
export type GetSiteInfoOperation = {
  data: {
    categories: Category[]
    brands: Brand[]
  }
}
