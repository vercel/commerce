import type { CheckoutEndpoint } from '.'
import sdkFetcherFunction from '../../utils/sdk-fetch'
import { normalizeTestCheckout } from '../../../utils/normalize-checkout'

const submitCheckout: CheckoutEndpoint['handlers']['submitCheckout'] = async ({
  res,
  body: { cartId },
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

  const shippingMethods = await sdkFetcher(
    'checkout',
    'getShippingOptions',
    checkoutToken,
    {
      country: 'US',
    }
  )

  // @ts-ignore
  const shippingMethodToUse = shippingMethods?.[0]?.id || ''

  const checkoutData = normalizeTestCheckout({
    shippingOption: shippingMethodToUse,
  })

  // Capture the order
  await sdkFetcher('checkout', 'capture', checkoutToken, checkoutData)

  res.status(200).json({ data: null, errors: [] })
}

export default submitCheckout
