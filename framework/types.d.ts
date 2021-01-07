interface ProductImage {
  url: string
  alt?: string
}

interface Product {
  id: string | number
  name: string
  description: string
  images: ProductImage[]
  prices: ProductPrice[]
  slug: string
  path?: string
}

interface ProductPrice {
  value: number | string
  currencyCode: 'USD' | 'ARS'
  type?: 'price' | 'retail' | 'sale' | string
}
