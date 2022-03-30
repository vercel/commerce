export type AppibaseVariation = {
  id: string
  name: string
  options?: AppibaseVariationOption[]
}

export type AppibaseVariationOption = {
  id: string
  name: string
  variation_name?: string
  variation?: AppibaseVariation
}

export type PriceList = {
  id: number
  name: string
  description?: string
  currency: string
  tax_incl: boolean
}

export type Amount = {
  cents: number
  float: number
  formatted: string
}

export type AppibasePrices = {
  data: AppibasePrice[]
}

export type AppibasePrice = {
  id: number
  currency: string
  amount: Amount
  original_amount: Amount
  price_list?: PriceList
  product?: AppibaseProduct
}

export type StockLocation = {
  id: number
  name: string
  description?: string
}

export type StockItem = {
  id: number
  quantity: number
  reserved: number
  available: number
  stock_location?: StockLocation
  product?: AppibaseProduct
}

export type AppibaseVariations = {
  data: AppibaseVariation[]
}

export type AppibaseProductChildren = {
  data: AppibaseProduct[]
}

export type AppibaseVariationOptions = {
  data: AppibaseVariationOption[]
}

export type AppibaseProduct = {
  id: string
  name: string
  description: string
  slug: string
  sku: string
  category: string
  vendor: string
  tags: string[]
  image_urls: string[]
  is_parent: boolean
  active: boolean
  livemode: boolean
  parent?: AppibaseProduct
  children?: AppibaseProductChildren
  variations?: AppibaseVariations
  variation_options?: AppibaseVariationOptions
  prices: AppibasePrices
  stock_items?: StockItem[]
}

export type AppibaseCollection = {
  id: number
  name: string
  description: string
  slug: string
  image_url: string
  is_parent: boolean
  active: boolean
  livemode: boolean
  parent?: AppibaseCollection
  children?: AppibaseCollection[]
  products?: AppibaseProduct[]
}

export type AppibaseCartItems = {
  data: AppibaseCartItem[]
}

export type AppibaseCart = {
  id: string
  guest: boolean
  email: string
  currency: string
  tax_incl: boolean
  tax_rate: number
  subtotal_amount: Amount
  shipping_amount: Amount
  tax_amount: Amount
  total_amount: Amount
  cart_items: AppibaseCartItems
}

export type AppibaseCartItem = {
  id: string
  name: string
  description: string
  sku: string
  image_url: string
  quantity: string
  currency: string
  price: Amount
  original_price: Amount
  subtotal_amount: Amount
}