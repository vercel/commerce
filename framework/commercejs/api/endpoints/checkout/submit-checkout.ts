import type { CheckoutEndpoint } from '.'
import sdkFetcherFunction from '../../utils/sdk-fetch'
import { normalizeTestCheckout } from '../../../utils/normalize-checkout'

const submitCheckout: CheckoutEndpoint['handlers']['submitCheckout'] = async ({
  req,
  res,
  body: {
    cartId,
    item: { checkout },
  },
  config: { sdkFetch },
}) => {
  const sdkFetcher: typeof sdkFetcherFunction = sdkFetch

  // Generate a checkout token
  const { id: checkoutToken } = await sdkFetcher(
    'checkout',
    'generateTokenFrom',
    'cart',
    cartId
  )

  const { addressFields } = checkout
  const checkoutData = normalizeTestCheckout({
    customer: {
      firstname: addressFields?.firstName,
      lastname: addressFields?.lastName,
    },
  })

  // Capture the order
  await sdkFetcher('checkout', 'capture', checkoutToken, checkoutData)

  res.status(200).json({ data: null, errors: [] })
}

export default submitCheckout
