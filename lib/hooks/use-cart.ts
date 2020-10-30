import useBigCommerceCart from '@bigcommerce/storefront-data-hooks/cart/use-cart'
import useBigCommercePrice from '@bigcommerce/storefront-data-hooks/use-price'

export const useCart = () => {
  const { data, error, isEmpty } = useBigCommerceCart()
  const isLoading = data === undefined

  const { price: subtotal } = useBigCommercePrice(
    data && {
      amount: data.base_amount,
      currencyCode: data.currency.code,
    }
  )
  const { price: total } = useBigCommercePrice(
    data && {
      amount: data.cart_amount,
      currencyCode: data.currency.code,
    }
  )

  const items = data?.line_items.physical_items ?? []

  return {
    items: data?.line_items.physical_items ?? [],
    isLoading: data === undefined,
    isError: error,
    isEmpty,
    subtotal,
    total,
    currency: data?.currency,
  }
}
