import type { GetStaticPropsContext } from 'next'
import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllPages from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import useCart from '@bigcommerce/storefront-data-hooks/cart/use-cart'
import usePrice from '@bigcommerce/storefront-data-hooks/use-price'
import { Layout } from '@components/core'
import { Button } from '@components/ui'
import { Bag, Cross, Check } from '@components/icons'
import { CartItem } from '@components/cart'
import { Text } from '@components/ui'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  return {
    props: { pages },
  }
}

export default function Cart() {
  const { data, error, isEmpty } = useCart()
  const isLoading = data === undefined

  const { price: subTotal } = usePrice(
    data && {
      amount: data.base_amount,
      currencyCode: data.currency.code,
    }
  )
  const { price: total } = usePrice(
    data && {
      amount: data.cart_amount,
      currencyCode: data.currency.code,
    }
  )

  const items = data?.line_items.physical_items ?? []

  return (
    <div className="px-4 pt-2 sm:px-6 flex-1">
      <Text variant="pageHeading">My Cart</Text>
      {error && <div className="mt-2">Failed to load</div>}
      {isLoading && <div>Loading...</div>}
      {isEmpty ? (
        <div className="flex-1 px-12 py-24 flex flex-col justify-center items-center ">
          <span className="border border-dashed border-secondary rounded-full flex items-center justify-center w-16 h-16 bg-primary p-12 rounded-lg text-primary">
            <Bag className="absolute" />
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            Your cart is empty
          </h2>
          <p className="text-accents-6 px-10 text-center pt-2">
            Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex-1">
              <Text variant="sectionHeading">Review your Order</Text>
              <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accents-2 border-b border-accents-2">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    currencyCode={data?.currency.code!}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="flex-shrink-0 pt-10 sm:pl-16">
              <div className="border-t border-accents-2">
                <ul className="pt-5 pb-7">
                  <li className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{subTotal}</span>
                  </li>
                  <li className="flex justify-between mt-3">
                    <span>Taxes</span>
                    <span>Calculated at checkout</span>
                  </li>
                  <li className="flex justify-between mt-3">
                    <span>Estimated Shipping</span>
                    <span className="font-bold tracking-wide">FREE</span>
                  </li>
                </ul>
                <div className="flex justify-between border-t border-accents-2 font-bold pt-6 mb-10">
                  <span>Total</span>
                  <span>{total}</span>
                </div>
              </div>
              <div className="flex flex-row justify-end">
                <div className="w-full lg:w-72">
                  {isEmpty ? (
                    <Button href="/" Component="a" width="100%">
                      Continue Shopping
                    </Button>
                  ) : (
                    <Button href="/checkout" Component="a" width="100%">
                      Proceed to Checkout
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

Cart.Layout = Layout
