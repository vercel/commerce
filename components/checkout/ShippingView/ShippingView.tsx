import { FC } from 'react'
import s from './ShippingView.module.css'
import { ChevronLeft } from '@components/icons'
import { UserNav } from '@components/common'
import { useUI } from '@components/ui/context'

const PaymentMethodView: FC = () => {
  const { setSidebarView } = useUI()

  return (
    <div className={s.root}>
      <header className="px-4 pt-6 pb-4 sm:px-6">
        <div className="flex items-start justify-between space-x-3">
          <div className="h-7 flex items-center">
            <button
              onClick={() => setSidebarView('CHECKOUT_VIEW')}
              aria-label="Close panel"
              className="hover:text-gray-500 transition ease-in-out duration-150 flex items-center focus:outline-none"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="ml-2 text-accents-7 text-xs hover:text-gray-500">
                Back
              </span>
            </button>
          </div>
          <div className="space-y-1">
            <UserNav />
          </div>
        </div>
      </header>
      <div className="px-4 sm:px-6 flex-1">
        <h2 className="pt-1 pb-2 text-sm uppercase font-semibold tracking-wide cursor-pointer inline-block">
          Shipping
        </h2>
      </div>
    </div>
  )
}

export default PaymentMethodView
