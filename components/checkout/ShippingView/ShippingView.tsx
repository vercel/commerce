import { FC } from 'react'
import s from './ShippingView.module.css'
import { ChevronLeft } from '@components/icons'
import { UserNav } from '@components/common'
import { useUI } from '@components/ui/context'
import Button from '@components/ui/Button'
import cn from 'classnames'

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
              <span className="ml-2 text-accent-7 text-xs hover:text-gray-500">
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
        <h2 className="pt-1 pb-8 text-2xl font-semibold tracking-wide cursor-pointer inline-block">
          Shipping
        </h2>
        <div>
          <div className="flex flex-row my-3 items-center">
            <input className={s.radio} type="radio" />
            <span className="ml-3 text-sm">Same as billing address</span>
          </div>
          <div className="flex flex-row my-3 items-center">
            <input className={s.radio} type="radio" />
            <span className="ml-3 text-sm">
              Use a different shipping address
            </span>
          </div>
          <hr className="border-accent-3 my-6" />
          <div className="grid gap-3 grid-flow-row grid-cols-12">
            <div className={cn(s.fieldset, 'col-span-6')}>
              <label className={s.label}>First Name</label>
              <input className={s.input} />
            </div>
            <div className={cn(s.fieldset, 'col-span-6')}>
              <label className={s.label}>Last Name</label>
              <input className={s.input} />
            </div>
          </div>
          <div className={s.fieldset}>
            <label className={s.label}>Company (Optional)</label>
            <input className={s.input} />
          </div>
          <div className={s.fieldset}>
            <label className={s.label}>Street and House Number</label>
            <input className={s.input} />
          </div>
          <div className={s.fieldset}>
            <label className={s.label}>Apartment, Suite, Etc. (Optional)</label>
            <input className={s.input} />
          </div>
          <div className="grid gap-3 grid-flow-row grid-cols-12">
            <div className={cn(s.fieldset, 'col-span-6')}>
              <label className={s.label}>Postal Code</label>
              <input className={s.input} />
            </div>
            <div className={cn(s.fieldset, 'col-span-6')}>
              <label className={s.label}>City</label>
              <input className={s.input} />
            </div>
          </div>
          <div className={s.fieldset}>
            <label className={s.label}>Country/Region</label>
            <select className={s.select}>
              <option>Hong Kong</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-10 sticky z-20 bottom-0 w-full right-0 left-0 p-6">
        <Button href="/checkout" Component="a" width="100%" variant="ghost">
          Continue
        </Button>
      </div>
    </div>
  )
}

export default PaymentMethodView
