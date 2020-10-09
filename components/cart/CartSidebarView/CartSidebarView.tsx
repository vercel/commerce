import { FC } from 'react'
import cn from 'classnames'
import { UserNav } from '@components/core'
import { Button } from '@components/ui'
import { ArrowLeft, Bag, Cross, Check } from '@components/icon'
import { useUI } from '@components/ui/context'
import useCart from '@lib/bigcommerce/cart/use-cart'
import CartItem from '../CartItem'
import Link from '@components/ui/Link'

const CartSidebarView: FC = () => {
  const { data, isEmpty } = useCart()
  const { closeSidebar } = useUI()
  const items = data?.line_items.physical_items ?? []
  const handleClose = () => closeSidebar()

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
            <h2 className="pt-6 pb-4 text-lg leading-7 font-medium text-gray-900 uppercase">
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
          <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
            <Button href="/checkout" Component={Link} width="100%">
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartSidebarView
