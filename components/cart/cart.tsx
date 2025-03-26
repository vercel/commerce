import {
  addItem,
  removeItem,
  updateItemQuantity,
  redirectToCheckout,
} from './actions'

const handleCheckout = async () => {
  try {
    await redirectToCheckout()
  } catch (e) {
    console.error('Checkout error:', e)
  }
}
