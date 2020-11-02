import type { GetStaticPropsContext } from 'next'
import { getConfig } from '@bigcommerce/storefront-data-hooks/api'
import getAllPages from '@bigcommerce/storefront-data-hooks/api/operations/get-all-pages'
import useCart from '@bigcommerce/storefront-data-hooks/cart/use-cart'
import usePrice from '@bigcommerce/storefront-data-hooks/use-price'
import { Layout } from '@components/core'
import { Button } from '@components/ui'
import { CartItem } from '@components/cart'
import { Text } from '@components/ui'
import CartSkeleton from '@components/cart/CartSkeleton'
import CartEmpty from '@components/cart/CartEmpty'

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
  const { data, error } = useCart()
  const isLoading = data === undefined
  const items = data?.line_items.physical_items ?? []

  const { price: subtotal } = usePrice(
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

  return (
    <div className="px-4 pt-2 sm:px-6 flex-1">
      <Text variant="pageHeading">My Cart</Text>
      {error ? (
        <div className="mt-2">Failed to load</div>
      ) : isLoading ? (
        <CartSkeleton />
      ) : items.length > 0 ? (
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
            <div className="mt-8 text-gray-700">
              <div>
                Before you leave, take a look at these items. We picked them
                just for you:
              </div>
              <div className="flex py-6 space-x-6">
                {[1, 2, 3, 4, 5, 6].map((x) => (
                  <div
                    key={x}
                    className="border border-accents-3 w-full h-24 bg-accents-2 bg-opacity-50 transform cursor-pointer hover:scale-110 duration-75"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="flex-shrink-0 pt-10 sm:pl-16">
              <div className="border-t border-accents-2">
                <ul className="pt-5 pb-7">
                  <li className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{subtotal}</span>
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
                  <Button href="/checkout" Component="a" width="100%">
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CartEmpty />
      )}
    </div>
  )
}

Cart.Layout = Layout
