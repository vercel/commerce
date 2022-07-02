import type { GetStaticPropsContext } from 'next'
import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { Button, Text, Container } from '@components/ui'
import { Bag, Cross, Check, MapPin, CreditCard } from '@components/icons'
import { CartItem } from '@components/cart'
import { useUI } from '@components/ui/context'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise
  return {
    props: { pages, categories },
  }
}

export default function Cart() {
  const error = null
  const success = null
  const { data, isLoading, isEmpty } = useCart()
  const { openSidebar, setSidebarView } = useUI()

  const { price: subTotal } = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  )
  const { price: total } = usePrice(
    data && {
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code,
    }
  )

  const goToCheckout = () => {
    openSidebar()
    setSidebarView('CHECKOUT_VIEW')
  }

  return (
    <Container className="grid lg:grid-cols-12 pt-4 gap-20">
      <div className="lg:col-span-7">
        {isLoading || isEmpty ? (
          <div className="flex-1 px-12 py-24 flex flex-col justify-center items-center ">
            <span className="border border-dashed border-secondary flex items-center justify-center w-16 h-16 bg-primary p-12 rounded-lg text-primary">
              <Bag className="absolute" />
            </span>
            <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
              Your cart is empty
            </h2>
            <p className="text-accent-6 px-10 text-center pt-2">
              Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
            </p>
          </div>
        ) : error ? (
          <div className="flex-1 px-4 flex flex-col justify-center items-center">
            <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
              <Cross width={24} height={24} />
            </span>
            <h2 className="pt-6 text-xl font-light text-center">
              We couldn’t process the purchase. Please check your card
              information and try again.
            </h2>
          </div>
        ) : success ? (
          <div className="flex-1 px-4 flex flex-col justify-center items-center">
            <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
              <Check />
            </span>
            <h2 className="pt-6 text-xl font-light text-center">
              Thank you for your order.
            </h2>
          </div>
        ) : (
          <div className="lg:px-0 sm:px-6 flex-1">
            <Text variant="pageHeading">My Cart</Text>
            <Text variant="sectionHeading">Review your Order</Text>
            <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accent-2 border-b border-accent-2">
              {data!.lineItems.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={data?.currency.code!}
                />
              ))}
            </ul>
            <div className="my-6">
              <Text>
                Before you leave, take a look at these items. We picked them
                just for you
              </Text>
              <div className="flex py-6 space-x-6">
                {[1, 2, 3, 4, 5, 6].map((x) => (
                  <div
                    key={x}
                    className="border border-accent-3 w-full h-24 bg-accent-2 bg-opacity-50 transform cursor-pointer hover:scale-110 duration-75"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="lg:col-span-5">
        <div className="flex-shrink-0 px-4 py-24 sm:px-6">
          {process.env.COMMERCE_CUSTOMCHECKOUT_ENABLED && (
            <>
              {/* Shipping Address */}
              {/* Only available with customCheckout set to true - Meaning that the provider does offer checkout functionality. */}
              <div className="rounded-md border border-accent-2 px-6 py-6 mb-4 text-center flex items-center justify-center cursor-pointer hover:border-accent-4">
                <div className="mr-5">
                  <MapPin />
                </div>
                <div className="text-sm text-center font-medium">
                  <span className="uppercase">+ Add Shipping Address</span>
                  {/* <span>
                    1046 Kearny Street.<br/>
                    San Franssisco, California
                  </span> */}
                </div>
              </div>
              {/* Payment Method */}
              {/* Only available with customCheckout set to true - Meaning that the provider does offer checkout functionality. */}
              <div className="rounded-md border border-accent-2 px-6 py-6 mb-4 text-center flex items-center justify-center cursor-pointer hover:border-accent-4">
                <div className="mr-5">
                  <CreditCard />
                </div>
                <div className="text-sm text-center font-medium">
                  <span className="uppercase">+ Add Payment Method</span>
                  {/* <span>VISA #### #### #### 2345</span> */}
                </div>
              </div>
            </>
          )}
          <div className="border-t border-accent-2">
            <ul className="py-3">
              <li className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>{subTotal}</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Estimated Shipping</span>
                <span className="font-bold tracking-wide">FREE</span>
              </li>
            </ul>
            <div className="flex justify-between border-t border-accent-2 py-3 font-bold mb-10">
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
                <>
                  {process.env.COMMERCE_CUSTOMCHECKOUT_ENABLED ? (
                    <Button Component="a" width="100%" onClick={goToCheckout}>
                      Proceed to Checkout ({total})
                    </Button>
                  ) : (
                    <Button href="/checkout" Component="a" width="100%">
                      Proceed to Checkout
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

Cart.Layout = Layout
