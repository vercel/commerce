import type { SEO } from './common'

export type ProductImage = {
  url: string
  alt?: string
}

export type ProductPrice = {
  value: number
  currencyCode?: 'USD' | 'EUR' | 'ARS' | 'GBP' | string
  retailPrice?: number
  salePrice?: number
  listPrice?: number
  extendedSalePrice?: number
  extendedListPrice?: number
}

export type ProductOption = {
  __typename?: 'MultipleChoiceOption'
  id: string
  displayName: string
  values: ProductOptionValues[]
}

export type ProductOptionValues = {
  label: string
  hexColors?: string[]
}

export type ProductVariant = {
  id: string | number
  options: ProductOption[]
  availableForSale?: boolean
  price?: ProductPrice
  image?: ProductImage
}

export type ProductCustomField = {
  key: string
  name: string
  value: string

  type?: string
  htmlValue?: string
  description?: string
}

export type Product = {
  id: string
  name: string
  description: string
  descriptionHtml?: string
  sku?: string
  slug?: string
  path?: string
  images: ProductImage[]
  variants: ProductVariant[]
  price: ProductPrice
  options: ProductOption[]
  vendor?: string
  seo?: SEO
  customFields?: ProductCustomField[]
}

export type SearchProductsBody = {
  search?: string
  categoryId?: string | number
  brandId?: string | number
  sort?: string
  locale?: string
}

export type ProductTypes = {
  product: Product
  searchBody: SearchProductsBody
}

export type SearchProductsHook<T extends ProductTypes = ProductTypes> = {
  data: {
    products: T['product'][]
    found: boolean
  }
  body: T['searchBody']
  input: T['searchBody']
  fetcherInput: T['searchBody']
}

export type ProductsSchema<T extends ProductTypes = ProductTypes> = {
  endpoint: {
    options: {}
    handlers: {
      getProducts: SearchProductsHook<T>
    }
  }
}

export type GetAllProductPathsOperation<T extends ProductTypes = ProductTypes> =
  {
    data: { products: Pick<T['product'], 'path'>[] }
    variables: { first?: number }
  }

export type GetAllProductsOperation<T extends ProductTypes = ProductTypes> = {
  data: { products: T['product'][] }
  variables: {
    relevance?: 'featured' | 'best_selling' | 'newest'
    ids?: string[]
    first?: number
  }
}

export type GetProductOperation<T extends ProductTypes = ProductTypes> = {
  data: { product?: T['product'] }
  variables: { slug?: string; path?: string; withCustomFields?: boolean }
}
