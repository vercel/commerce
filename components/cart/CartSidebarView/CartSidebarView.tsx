import { FC } from 'react'
import { UserNav } from '@components/core'
import { Button } from '@components/ui'
import { Trash, Cross } from '@components/icon'
import { useUI } from '@components/ui/context'
import { useCart } from '@lib/bigcommerce/cart'
import CartItem from '../CartItem'

const CartSidebarView: FC = () => {
  const { data, isEmpty } = useCart()
  const { closeSidebar } = useUI()
  const items = data?.line_items.physical_items ?? []

  console.log('CART', data, isEmpty)

  return (
    <>
      <header className="px-4 py-6 sm:px-6 border-b border-gray-200">
        <div className="flex items-start justify-between space-x-3">
          <div className="h-7 flex items-center">
            <button
              onClick={() => closeSidebar()}
              aria-label="Close panel"
              className="text-gray-400 hover:text-gray-500 transition ease-in-out duration-150"
            >
              <Cross className="h-6 w-6" />
            </button>
          </div>
          <div className="space-y-1">
            <UserNav />
          </div>
        </div>
        {isEmpty ? (
          <h2 className="pt-6 text-lg leading-7 font-medium text-gray-900 uppercase">
            Your cart is currently empty
          </h2>
        ) : (
          <h2 className="pt-6 text-lg leading-7 font-medium text-gray-900 uppercase">
            My Cart
          </h2>
        )}
      </header>

      {isEmpty ? (
        <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
          <Button>Continue Shopping</Button>
        </div>
      ) : (
        <>
          <div className="px-4 sm:px-6 py-4 flex-1">
            <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
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
            <Button>Proceed to Checkout</Button>
          </div>
        </>
      )}
    </>
  )
}

export default CartSidebarView
