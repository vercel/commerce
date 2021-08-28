import { FC } from 'react'
import cn from 'classnames'
import { Button, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import s from './PaymentMethodView.module.css'
import SidebarLayout from '@components/common/SidebarLayout'

const PaymentMethodView: FC = () => {
  const { setSidebarView } = useUI()

  return (
    <SidebarLayout handleBack={() => setSidebarView('CHECKOUT_VIEW')}>
      <div className="px-4 sm:px-6 flex-1">
        <Text variant="sectionHeading"> Payment Method</Text>
        <div>
          <div className={s.fieldset}>
            <label className={s.label}>Cardholder Name</label>
            <input className={s.input} />
          </div>
          <div className="grid gap-3 grid-flow-row grid-cols-12">
            <div className={cn(s.fieldset, 'col-span-7')}>
              <label className={s.label}>Card Number</label>
              <input className={s.input} />
            </div>
            <div className={cn(s.fieldset, 'col-span-3')}>
              <label className={s.label}>Expires</label>
              <input className={s.input} placeholder="MM/YY" />
            </div>
            <div className={cn(s.fieldset, 'col-span-2')}>
              <label className={s.label}>CVC</label>
              <input className={s.input} />
            </div>
          </div>
          <hr className="border-accent-2 my-6" />
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
      <div className="sticky z-20 bottom-0 w-full right-0 left-0 py-12 bg-accent-0 border-t border-accent-2 px-6">
        <Button Component="a" width="100%" variant="ghost">
          Continue
        </Button>
      </div>
    </SidebarLayout>
  )
}

export default PaymentMethodView
