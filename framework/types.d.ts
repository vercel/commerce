interface Entity {
  id: string | number
  [prop: string]: any
}

interface Product extends Entity {
  name: string
  description: string
  slug: string
  path?: string
  images: ProductImage[]
  variants: ProductVariant[]
  price: ProductPrice
  options: ProductOption[]
}

interface ProductOption extends Entity {
  displayName: string
  values: ProductOptionValues[]
}

interface ProductOptionValues {
  label: string
  hexColors?: string[]
}

interface ProductImage {
  url: string
  alt?: string
}

interface ProductVariant {
  id: string | number
  options: ProductOption[]
}

interface ProductPrice {
  value: number
  currencyCode: 'USD' | 'ARS' | string | undefined
  retailValue?: number
  saleValue?: number
}

interface Cart extends Entity {
  id: string | undefined
  currency: { code: string }
  taxIncluded?: boolean
  totalAmmount: number | string
  products: Pick<Product, 'id' | 'name' | 'prices'>[]
}

interface Wishlist extends Entity {
  products: Pick<Product, 'id' | 'name' | 'prices'>[]
}

interface Order {}

interface Customer extends Entity {}

type UseCustomerResponse = {
  customer: Customer
} | null

interface Category extends Entity {
  name: string
}

interface Brand extends Entity {
  name: string
}

type Features = 'wishlist' | 'customer'
