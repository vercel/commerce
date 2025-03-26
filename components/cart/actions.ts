'use server'

import { TAGS } from 'lib/constants'
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from 'lib/shopify'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function validateAndGetCart() {
  const cookieStore = await cookies()
  const cartId = cookieStore.get('cartId')?.value

  try {
    if (!cartId) {
      const newCart = await createCart()
      cookieStore.set('cartId', newCart.id!)
      return newCart
    }

    const cart = await getCart()
    if (!cart?.id) {
      const newCart = await createCart()
      cookieStore.set('cartId', newCart.id!)
      return newCart
    }

    return cart
  } catch (e) {
    console.error('Error validating cart:', e)
    const newCart = await createCart()
    cookieStore.set('cartId', newCart.id!)
    return newCart
  }
}

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined,
) {
  if (!selectedVariantId) {
    return 'Missing variant ID'
  }

  try {
    const cart = await validateAndGetCart()

    try {
      const updatedCart = await addToCart([
        { merchandiseId: selectedVariantId, quantity: 1 },
      ])

      if (!updatedCart?.id) {
        throw new Error('Invalid cart after add operation')
      }

      revalidateTag(TAGS.cart)
      return
    } catch (addError) {
      console.error('Add operation failed:', addError)
      const cookieStore = await cookies()
      const newCart = await createCart()
      cookieStore.set('cartId', newCart.id!)
      revalidateTag(TAGS.cart)
      return 'Failed to add item - created new cart'
    }
  } catch (e) {
    console.error('Cart error:', e)
    return 'Error adding item'
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  try {
    const cart = await validateAndGetCart()

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId,
    )

    if (!lineItem?.id) {
      return 'Item not found in cart'
    }

    try {
      const updatedCart = await removeFromCart([lineItem.id])

      if (!updatedCart?.id) {
        throw new Error('Invalid cart after remove operation')
      }

      if (cart.lines.length <= 1) {
        const cookieStore = await cookies()
        const newCart = await createCart()
        cookieStore.set('cartId', newCart.id!)
      }

      revalidateTag(TAGS.cart)
      return
    } catch (removeError) {
      console.error('Remove operation failed:', removeError)
      const cookieStore = await cookies()
      const newCart = await createCart()
      cookieStore.set('cartId', newCart.id!)
      revalidateTag(TAGS.cart)
      return 'Failed to remove item - created new cart'
    }
  } catch (e) {
    console.error('Cart error:', e)
    return 'Error removing item'
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string
    quantity: number
  },
) {
  const { merchandiseId, quantity } = payload

  try {
    const cart = await validateAndGetCart()

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId,
    )

    try {
      // Handle item removal
      if (quantity <= 0 && lineItem?.id) {
        const updatedCart = await removeFromCart([lineItem.id])

        if (!updatedCart?.id) {
          throw new Error('Invalid cart after remove operation')
        }

        if (cart.lines.length <= 1) {
          const cookieStore = await cookies()
          const newCart = await createCart()
          cookieStore.set('cartId', newCart.id!)
        }

        revalidateTag(TAGS.cart)
        return
      }

      // Handle quantity update
      if (lineItem?.id && quantity > 0) {
        const updatedCart = await updateCart([
          {
            id: lineItem.id,
            merchandiseId,
            quantity,
          },
        ])

        if (!updatedCart?.id) {
          throw new Error('Invalid cart after update operation')
        }

        revalidateTag(TAGS.cart)
        return
      }

      // Handle new item addition
      if (quantity > 0) {
        const updatedCart = await addToCart([{ merchandiseId, quantity }])

        if (!updatedCart?.id) {
          throw new Error('Invalid cart after add operation')
        }

        revalidateTag(TAGS.cart)
        return
      }
    } catch (operationError) {
      console.error('Cart operation failed:', operationError)
      const cookieStore = await cookies()
      const newCart = await createCart()
      cookieStore.set('cartId', newCart.id!)
      revalidateTag(TAGS.cart)
      return 'Cart operation failed - created new cart'
    }
  } catch (e) {
    console.error('Cart error:', e)
    const cookieStore = await cookies()
    const newCart = await createCart()
    cookieStore.set('cartId', newCart.id!)
    revalidateTag(TAGS.cart)
    return 'Cart reset due to error'
  }
}

export async function redirectToCheckout() {
  let cart = await getCart()
  redirect(cart!.checkoutUrl)
}

export async function createCartAndSetCookie() {
  try {
    const cart = await createCart()
    const cookieStore = await cookies()
    cookieStore.set('cartId', cart.id!)
    return cart
  } catch (e) {
    console.error('Failed to create cart:', e)
    throw e
  }
}
