export type ProductImage = {
  url: string
  alt?: string
}

export type ProductPrice = {
  value: number
  currencyCode?: 'USD' | 'ARS' | string
  retailPrice?: number
  salePrice?: number
  listPrice?: number
  extendedSalePrice?: number
  extendedListPrice?: number
}

export type ProductOption = {
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
}

export type ProductTypes = {
  product: Product
}

export type ProductsSchema<T extends ProductTypes = ProductTypes> = {
  endpoint: {
    options: {}
    handlers: {
      getProducts: {
        data: {
          products: T['product'][]
          found: boolean
        }
        body: {
          search?: string
          category?: string
          brand?: string
          sort?: string
        }
      }
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
    relevance?: 'featured' | 'best_selling' | 'newest'
    ids?: string[]
    first?: number
  }
}
