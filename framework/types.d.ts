interface Entity {
  id: string | number
  [prop: string]: any
}

interface Product extends Entity {
  name: string
  description: string
  slug?: string
  path?: string
  images: ProductImage[]
  variants: ProductVariant[]
  price: ProductPrice
  options: ProductOption[]
  sku?: string
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
  retailPrice?: number
  salePrice?: number
  listPrice?: number
  extendedSalePrice?: number
  extendedListPrice?: number
}

interface Cart extends Entity {
  id: string | undefined
  currency: { code: string }
  taxIncluded?: boolean
  products: Pick<Product, 'id' | 'name' | 'prices'> & CartItem[]
  subTotal: number | string
  total: number | string
}

interface CartItem extends Entity {
  quantity: number
  productId: Product['id']
  variantId: ProductVariant['id']
  images: ProductImage[]
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
