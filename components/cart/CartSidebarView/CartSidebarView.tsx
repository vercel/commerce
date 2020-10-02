import React, { FunctionComponent } from 'react'
import { UserNav } from '@components/core'
import { Button } from '@components/ui'
import { Trash, Cross } from '@components/icon'
import { useUI } from '@components/ui/context'

const CartSidebarView: FunctionComponent = () => {
  const { closeSidebar } = useUI()
  return (
    <>
      <header className="px-4 py-6 sm:px-6 border-b border-gray-200">
        <div className="flex items-start justify-between space-x-3">
          <div className="h-7 flex items-center">
            <button
              onClick={closeSidebar}
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
        <h2 className="pt-6 text-lg leading-7 font-medium text-gray-900 uppercase">
          My Cart
        </h2>
      </header>

      <div className="px-4 sm:px-6 py-4 flex-1">
        <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <li className="flex flex-row space-x-6">
            <div className="h-12 w-12 bg-violet"></div>
            <div className="flex-1 flex flex-col">
              <span>T-Shirt</span>
              <div className="py-2">
                <span>-</span>
                <input
                  className="w-6 border-gray-300 border mx-3 rounded text-center text-sm"
                  defaultValue="1"
                />
                <span>+</span>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <span>$50.00</span>
              <span className="flex justify-end">
                <Trash />
              </span>
            </div>
          </li>
        </ul>
      </div>

      <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
        <Button>Proceed to Checkout</Button>
      </div>
    </>
  )
}

export default CartSidebarView
