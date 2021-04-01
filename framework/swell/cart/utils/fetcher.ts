import { HookFetcherFn } from '@commerce/utils/types'
import { Cart } from '@commerce/types'
// import { checkoutCreate, checkoutToCart } from '.'
import { FetchCartInput } from '@commerce/cart/use-cart'
import { data } from 'autoprefixer'
import { normalizeCart } from '../../utils'

const fetcher: HookFetcherFn<Cart | null, FetchCartInput> = async ({
  options,
  // input: { cartId: checkoutId },
  fetch,
}) => {
  let checkout

  // if (checkoutId) {
  const data = await fetch({
    query: 'cart',
    method: 'get',
    // variables: { category: categoryId },
  })
  // checkout = data.node
  // }

  // if (checkout?.completedAt || !checkoutId) {
  //   checkout = await checkoutCreate(fetch)
  // }

  // TODO: Fix this type
  // return checkoutToCart({ checkout } as any)
  return normalizeCart(data)
}

export default fetcher
