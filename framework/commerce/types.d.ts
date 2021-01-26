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

interface DiscountBase {
  // The value of the discount, can be an amount or percentage
  value: number
}

interface BaseLineItem {
  id: string
  variantId: string
  name: string
  quantity: number
  discounts: DiscountBase[]
  variant: BaseProductVariant
}

interface Measurement {
  value: number
  unit: 'KILOGRAMS' | 'GRAMS' | 'POUNDS' | 'OUNCES'
}

interface Image {
  url: string
  altText?: string
  width?: number
  height?: number
}

interface BaseProductVariant {
  id: string
  // The SKU (stock keeping unit) associated with the product variant.
  sku: string
  // The product variant’s title, or the product's name.
  name: string
  // Indicates whether this product variant is in stock.
  isInStock: boolean
  // Indicates if the product variant is available for sale.
  availableForSale: boolean
  // Whether a customer needs to provide a shipping address when placing
  // an order for the product variant.
  requiresShipping: boolean
  // Image associated with the product variant. Falls back to the product image
  // if no image is available.
  image: Image
  // The variant's weight. If a weight was not explicitly specified on the
  // variant this will be the product's weight.
  weight?: Measurement
  // The variant's height. If a height was not explicitly specified on the
  // variant, this will be the product's height.
  height?: Measurement
  // The variant's width. If a width was not explicitly specified on the
  // variant, this will be the product's width.
  width?: Measurement
  // The variant's depth. If a depth was not explicitly specified on the
  // variant, this will be the product's depth.
  depth?: Measurement
}

// Shopping cart, a.k.a Checkout
interface BaseCart {
  id: string
  // ID of the customer to which the cart belongs.
  customerId?: string
  // The email assigned to this cart
  email?: string
  // The date and time when the cart was created.
  createdAt: string
  // The currency used for this cart
  currency: { code: string }
  // Specifies if taxes are included in the line items.
  taxesIncluded: boolean
  lineItems: Pick<Product, 'id' | 'name' | 'prices'> & CartItem[]
  // The sum of all the prices of all the items in the cart.
  // Duties, taxes, shipping and discounts excluded.
  lineItemsSubtotalPrice: number
  // Price of the cart before duties, shipping and taxes.
  subtotalPrice: number
  // The sum of all the prices of all the items in the cart.
  // Duties, taxes and discounts included.
  totalPrice: number
  // Discounts that have been applied on the cart.
  discounts?: DiscountBase[]
}

// TODO: Remove this type in favor of BaseCart
interface Cart2 extends Entity {
  id: string | undefined
  currency: { code: string }
  taxIncluded?: boolean
  items: Pick<Product, 'id' | 'name' | 'prices'> & CartItem[]
  subTotal: number | string
  total: number | string
  customerId: Customer['id']
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
