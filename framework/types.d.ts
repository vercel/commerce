interface Product {
  id: string | number
  name: string
  description: string
  images: Image[]
  slug: string
  price: string
  variantId: string
}

interface Image {
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
