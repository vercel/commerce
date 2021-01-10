interface Entity {
  id: string | number
  [prop: string]: any
}

interface Product extends Entity {
  name: string
  description: string
  slug: string
  path?: string
  images: ProductImage[] | any[] | undefined
  variants: ProductVariant[] | any[] | undefined
  price: ProductPrice
}
interface ProductImage {
  url: string
  alt?: string
}

interface ProductVariant {
  id: string | number
}

interface ProductPrice {
  value: number
  currencyCode: 'USD' | 'ARS' | string | undefined
  retailValue?: number
  saleValue?: number
}

interface Cart extends Entity {
  id: string
  products: Pick<Product, 'id' | 'name' | 'prices'>[]
}

interface Wishlist extends Entity {
  products: Pick<Product, 'id' | 'name' | 'prices'>[]
}

interface Order {}

interface Customer extends Entity {
  [prop: string]: any
}

type UseCustomerResponse = {
  customer: Customer
} | null

interface Category extends Entity {
  id: string
  name: string
}

interface Brand extends Entity {
  id: string
  name: string
}

type Features = 'wishlist' | 'customer'
