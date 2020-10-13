import { FC } from 'react'
import cn from 'classnames'
import { UserNav } from '@components/core'
import { Button } from '@components/ui'
import { ArrowLeft, Bag, Cross, Check } from '@components/icon'
import { useUI } from '@components/ui/context'
import useCart from '@lib/bigcommerce/cart/use-cart'
import usePrice from '@lib/bigcommerce/use-price'
import CartItem from '../CartItem'
import useOpenCheckout from '@lib/bigcommerce/cart/use-open-checkout'

const CartSidebarView: FC = () => {
  const { data, isEmpty } = useCart()
  const { price: subTotal } = usePrice(data && {
    amount: data.base_amount,
    currencyCode: data.currency.code,
  })
  const { price: total } = usePrice(data && {
    amount: data.cart_amount,
    currencyCode: data.currency.code,
  })
  const openCheckout = useOpenCheckout()
  const { closeSidebar } = useUI()
  const handleClose = () => closeSidebar()

  const items = data?.line_items.physical_items ?? []

  console.log('CART', data, isEmpty)

  // This should come from the API via hook I guess
  const error = null
  const success = null

  return (
    <div
      className={cn('h-full flex flex-col', {
        'bg-black text-white': isEmpty,
        'bg-red text-white': error,
        'bg-green text-white': success,
      })}
    >
      <header className="px-4 pt-6 pb-4 sm:px-6">
        <div className="flex items-start justify-between space-x-3">
          <div className="h-7 flex items-center">
            <button
              onClick={handleClose}
              aria-label="Close panel"
              className="hover:text-gray-500 transition ease-in-out duration-150"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
          </div>
          <div className="space-y-1">
            <UserNav />
          </div>
        </div>
      </header>

      {isEmpty ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-dashed border-white rounded-full flex items-center justify-center w-16 h-16">
            <Bag />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            Your cart is empty.
          </h2>
        </div>
      ) : error ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Cross width={24} height={24} />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            We couldn’t process the purchase. Please check your card information
            and try again.
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
        <>
          <div className="px-4 sm:px-6 flex-1">
            <h2 className="pt-1 pb-4 text-lg leading-7 font-medium text-gray-900 uppercase">
              My Cart
            </h2>
            <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200 border-t border-gray-200">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={data?.currency.code!}
                />
              ))}
            </ul>
          </div>

          <div className="flex-shrink-0 px-4  py-5 sm:px-6">
            <div className="border-t border-gray-200">
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
                  <span>FREE</span>
                </li>
              </ul>
              <div className="flex justify-between border-t border-gray-300 py-3 font-bold mb-10">
                <span>Total</span>
                <span>{total}</span>
              </div>
            </div>
            <Button width="100%" onClick={() => openCheckout()}>
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartSidebarView
