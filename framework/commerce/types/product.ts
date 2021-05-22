// TODO: define this type
export type Product = any

export type ProductTypes = {
  product: Product
}

export type ProductSchema<T extends ProductTypes = ProductTypes> = {
  endpoint: {
    options: {}
    handlers: {
      getProducts: {
        data: { product: T['product'] } | null
      }
    }
  }
}
