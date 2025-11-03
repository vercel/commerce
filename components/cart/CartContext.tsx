'use client'

import { createContext, useContext, useMemo, useState } from 'react'

type CartItem = { productId: string; quantity: number }
type CartContextType = {
  items: CartItem[]
  addItem: (productId: string, quantity?: number) => void
  removeItem: (productId: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const value = useMemo<CartContextType>(() => ({
    items,
    addItem: (productId, quantity = 1) => {
      setItems((prev) => {
        const idx = prev.findIndex((i) => i.productId === productId)
        if (idx >= 0) {
          const copy = [...prev]
          copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + quantity }
          return copy
        }
        return [...prev, { productId, quantity }]
      })
    },
    removeItem: (productId) => setItems((prev) => prev.filter((i) => i.productId !== productId)),
    clear: () => setItems([])
  }), [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}


