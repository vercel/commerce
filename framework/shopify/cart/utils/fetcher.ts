import { HookFetcherFn } from '@commerce/utils/types'
import { Cart } from '@commerce/types'
import { checkoutCreate, checkoutToCart } from '.'
import { FetchCartInput } from '@commerce/cart/use-cart'

const fetcher: HookFetcherFn<Cart | null, FetchCartInput> = async ({
  options,
  input: { cartId },
  fetch,
}) => {
  let checkout

  if (cartId) {
    const data = await fetch({
      ...options,
      variables: {
        cartId,
      },
    })
    checkout = data?.node
  }

  if (checkout?.completedAt || !cartId) {
    checkout = await checkoutCreate(fetch)
  }

  return checkoutToCart({ checkout })
}

export default fetcher
