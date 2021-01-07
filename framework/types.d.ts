interface Product {
  id: string | number
  name: string
  description: string
  images: Images[]
  slug: string
  price: string
  variantId: string
}

interface Images {
  src: string
  alt?: string
}

// interface NextImageProps {
//   src: string
//   width: number | string
//   height: number | string
//   layout?: 'fixed' | 'intrinsic' | 'responsive' | undefined
//   priority?: boolean
//   loading?: 'eager' | 'lazy'
//   sizes?: string
//   alt?: string
// }
