interface Product {
  id: string | number
  name: string
  description: string
  slug: string
  path?: string
  images: ProductImage[]
  variants: ProductVariant[]
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
  currencyCode: 'USD' | 'ARS'
  retailValue?: number
  saleValue?: number
}

interface Cart {
  id: string
  products: Pick<Product, 'id' | 'name' | 'prices'>[]
}

interface Wishlist {
  id: string
  products: Pick<Product, 'id' | 'name' | 'prices'>[]
}

interface Order {}

interface Customer {
  id: string | number | undefined
  [prop: string]: any
}

type UseCustomerResponse = {
  customer: Customer
} | null

interface Category {
  id: string
  name: string
}

interface Brand {
  id: string
  name: string
}

type Features = 'wishlist' | 'customer'
