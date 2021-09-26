import { FC } from 'react'
import cn from 'classnames'

import Button from '@components/ui/Button'
import { useUI } from '@components/ui/context'
import SidebarLayout from '@components/common/SidebarLayout'
// import useAddAddress from '@framework/customer/address/use-add-item'

import s from './ShippingView.module.css'

interface Form extends HTMLFormElement {
  cardHolder: HTMLInputElement
  cardNumber: HTMLInputElement
  cardExpireDate: HTMLInputElement
  cardCvc: HTMLInputElement
  firstName: HTMLInputElement
  lastName: HTMLInputElement
  company: HTMLInputElement
  streetNumber: HTMLInputElement
  zipCode: HTMLInputElement
  city: HTMLInputElement
  country: HTMLSelectElement
}

const PaymentMethodView: FC = () => {
  const { setSidebarView } = useUI()
  // const addAddress = useAddAddress()

  async function handleSubmit(event: React.ChangeEvent<Form>) {
    event.preventDefault()

    // await addAddress({
    //   type: event.target.type.value,
    //   firstName: event.target.firstName.value,
    //   lastName: event.target.lastName.value,
    //   company: event.target.company.value,
    //   streetNumber: event.target.streetNumber.value,
    //   apartments: event.target.streetNumber.value,
    //   zipCode: event.target.zipCode.value,
    //   city: event.target.city.value,
    //   country: event.target.country.value,
    // })

    setSidebarView('CHECKOUT_VIEW')
  }

  return (
    <form className="h-full" onSubmit={handleSubmit}>
      <SidebarLayout handleBack={() => setSidebarView('CHECKOUT_VIEW')}>
        <div className="flex-1 px-4 sm:px-6">
          <h2 className="inline-block pt-1 pb-8 text-2xl font-semibold tracking-wide cursor-pointer">
            Shipping
          </h2>
          <div>
            <div className="flex flex-row items-center my-3">
              <input name="type" className={s.radio} type="radio" />
              <span className="ml-3 text-sm">Same as billing address</span>
            </div>
            <div className="flex flex-row items-center my-3">
              <input name="type" className={s.radio} type="radio" />
              <span className="ml-3 text-sm">
                Use a different shipping address
              </span>
            </div>
            <hr className="my-6 border-accent-2" />
            <div className="grid grid-flow-row grid-cols-12 gap-3">
              <div className={cn(s.fieldset, 'col-span-6')}>
                <label className={s.label}>First Name</label>
                <input name="firstName" className={s.input} />
              </div>
              <div className={cn(s.fieldset, 'col-span-6')}>
                <label className={s.label}>Last Name</label>
                <input name="lastName" className={s.input} />
              </div>
            </div>
            <div className={s.fieldset}>
              <label className={s.label}>Company (Optional)</label>
              <input name="company" className={s.input} />
            </div>
            <div className={s.fieldset}>
              <label className={s.label}>Street and House Number</label>
              <input name="streetNumber" className={s.input} />
            </div>
            <div className={s.fieldset}>
              <label className={s.label}>
                Apartment, Suite, Etc. (Optional)
              </label>
              <input name="apartments" className={s.input} />
            </div>
            <div className="grid grid-flow-row grid-cols-12 gap-3">
              <div className={cn(s.fieldset, 'col-span-6')}>
                <label className={s.label}>Postal Code</label>
                <input name="zipCode" className={s.input} />
              </div>
              <div className={cn(s.fieldset, 'col-span-6')}>
                <label className={s.label}>City</label>
                <input name="city" className={s.input} />
              </div>
            </div>
            <div className={s.fieldset}>
              <label className={s.label}>Country/Region</label>
              <select name="country" className={s.select}>
                <option>Hong Kong</option>
              </select>
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 left-0 right-0 z-20 w-full px-6 py-12 border-t bg-accent-0 border-accent-2">
          <Button type="submit" width="100%" variant="ghost">
            Continue
          </Button>
        </div>
      </SidebarLayout>
    </form>
  )
}

export default PaymentMethodView
