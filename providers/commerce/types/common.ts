export type Discount = {
  // The value of the discount, can be an amount or percentage
  value: number
}

export type Measurement = {
  value: number
  unit: 'KILOGRAMS' | 'GRAMS' | 'POUNDS' | 'OUNCES'
}

export type Image = {
  url: string
  altText?: string
  width?: number
  height?: number
}
