import { CurrencyCode } from './../../vendure/schema.d';
import { FacetValueFilterInput, LogicalOperator, SearchResultSortParameter } from "@framework/schema"

export type ProductImage = {
  url: string
  alt?: string
}

export type ProductPrice = {
  value: number
  currencyCode?: 'USD' | 'EUR' | 'ARS' | string
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
  price: number
  currencyCode: CurrencyCode
  options: ProductOption[]
  facetValueIds?: string[]
  collectionIds?: string[]
  collection?: string[],
  variants?: ProductVariant[]
}

export type ProductCard = {
  id: string
  name: string
  slug?: string
  imageSrc: string
  price: number
  currencyCode: CurrencyCode
  oldPrice?: number
  discount?: number
  weight?: number
  facetValueIds?: string[],
  collectionIds?: string[],
  collection?: string,
  isNotSell?: boolean
  productVariantId?:string
  productVariantName?:string
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

export type GetAllProductPathsOperation<
  T extends ProductTypes = ProductTypes
  > = {
    data: { products: Pick<T['product'], 'path'>[] }
    variables: { first?: number }
  }

export type GetAllProductsOperation<T extends ProductTypes = ProductTypes> = {
  data: { products: T['product'][] }
  variables: {
    term?: String
    facetValueIds?: string[]
    facetValueOperator?: LogicalOperator
    facetValueFilters?: FacetValueFilterInput[]
    collectionId?: string
    collectionSlug?: string
    groupByProduct?: Boolean
    take?: number
    skip?: number
    sort?: SearchResultSortParameter
  }
}

export type GetProductOperation<T extends ProductTypes = ProductTypes> = {
  data: { product?: T['product'] }
  variables: { path: string; slug?: never } | { path?: never; slug: string }
}
