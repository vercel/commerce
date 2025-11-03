'use client'

import { Button } from '@/components/ui/button'
import { useCart } from './CartContext'

export function AddToCartButton({ productId }: { productId: string }) {
  const { addItem } = useCart()
  return (
    <Button onClick={() => addItem(productId)}>
      Add to Cart
    </Button>
  )
}


