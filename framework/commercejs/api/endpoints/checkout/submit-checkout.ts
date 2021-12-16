import type { CardFields } from '@commerce/types/customer/card'
import type { AddressFields } from '@commerce/types/customer/address'
import type { CheckoutEndpoint } from '.'
import sdkFetcherFunction from '../../utils/sdk-fetch'
import { normalizeTestCheckout } from '../../../utils/normalize-checkout'

const submitCheckout: CheckoutEndpoint['handlers']['submitCheckout'] = async ({
  res,
  body: { item, cartId },
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

  const shippingMethodToUse = shippingMethods?.[0]?.id || ''
  const checkoutData = normalizeTestCheckout({
    paymentInfo: item?.card as CardFields,
    shippingInfo: item?.address as AddressFields,
    shippingOption: shippingMethodToUse,
  })

  // Capture the order
  await sdkFetcher('checkout', 'capture', checkoutToken, checkoutData)

  res.status(200).json({ data: null, errors: [] })
}

export default submitCheckout
