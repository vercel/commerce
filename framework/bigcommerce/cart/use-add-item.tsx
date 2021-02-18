import type { MutationHandler } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useAddItem, { UseAddItem } from '@commerce/cart/use-add-item'
import { normalizeCart } from '../lib/normalize'
import type {
  AddCartItemBody,
  Cart,
  BigcommerceCart,
  CartItemBody,
} from '../types'
import useCart from './use-cart'
import { BigcommerceProvider } from '..'

const defaultOpts = {
  url: '/api/bigcommerce/cart',
  method: 'POST',
}

export default useAddItem as UseAddItem<BigcommerceProvider, CartItemBody>

export const handler: MutationHandler<Cart, {}, AddCartItemBody> = {
  fetchOptions: {
    url: '/api/bigcommerce/cart',
    method: 'GET',
  },
  async fetcher({ input: { item }, options, fetch }) {
    if (
      item.quantity &&
      (!Number.isInteger(item.quantity) || item.quantity! < 1)
    ) {
      throw new CommerceError({
        message: 'The item quantity has to be a valid integer greater than 0',
      })
    }

    const data = await fetch<BigcommerceCart, AddCartItemBody>({
      ...defaultOpts,
      ...options,
      body: { item },
    })

    return normalizeCart(data)
  },
  useHook() {
    const { mutate } = useCart()

    return async function addItem({ input, fetch }) {
      const data = await fetch({ input })
      await mutate(data, false)
      return data
    }
  },
}
