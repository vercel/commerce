export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

export type RecursiveRequired<T> = {
  [P in keyof T]-?: RecursiveRequired<T[P]>
}

export interface BCWishlist {
  id: number
  items: {
    id: number
    customer_id: number
    is_public: boolean
    product_id: number
    variant_id: number
  }[]
  token: string
}
