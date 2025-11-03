'use client'

import { useCart } from '@/components/cart/CartContext'
import { useState } from 'react'

export default function CheckoutPage() {
  const { items, clear } = useCart()
  const [creating, setCreating] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)

  async function createOrder() {
    if (items.length === 0) return
    setCreating(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: items[0].productId, paymentMethod: 'coinbase' })
      })
      if (!res.ok) throw new Error('Failed')
      const order = await res.json()
      setOrderId(order.id)
      const payRes = await fetch('/api/payments/coinbase/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order.id })
      })
      if (!payRes.ok) throw new Error('Failed to init checkout')
      const { hosted_url } = await payRes.json()
      setCheckoutUrl(hosted_url)
    } finally {
      setCreating(false)
      clear()
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h2 className="text-3xl font-semibold text-brand-midnight">Checkout</h2>
      <div className="mt-4 rounded-lg border bg-white p-6">
        <p className="text-brand-midnight/80">Items in cart: {items.length}</p>
        <button onClick={createOrder} disabled={creating || items.length === 0} className="mt-4 rounded-md bg-brand-turquoise px-4 py-2 text-white">
          {creating ? 'Creating Order...' : 'Create Order'}
        </button>
        {orderId && <p className="mt-3 text-sm text-brand-midnight/80">Order: {orderId}</p>}
        {checkoutUrl && (
          <a href={checkoutUrl} className="mt-3 inline-block rounded-md border border-brand-turquoise px-4 py-2 text-brand-turquoise">Proceed to Crypto Payment</a>
        )}
      </div>
    </div>
  )
}


