import { FC } from 'react'
import cn from 'classnames'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { Button, Text } from '@components/ui'
import { useUI } from '@components/ui/context'
import s from './PaymentMethodView.module.css'
import SidebarLayout from '@components/common/SidebarLayout'
import countries from '@lib/countries'

const PaymentMethodView: FC = () => {
  const { paymentMethodDetails, setPaymentMethodDetails, setSidebarView } = useUI()
  const { address } = paymentMethodDetails
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return
    }

    const card = elements.getElement(CardNumberElement)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })

    if (error) {
      console.error(error)
    }

    setPaymentMethodDetails({ address, paymentMethod })
    setSidebarView('CHECKOUT_VIEW')
  }

  const updateAddressData = ({ target }: any) => setPaymentMethodDetails({
    ...paymentMethodDetails,
    address: {
      ...paymentMethodDetails.address,
      [target.name]: target.value,
    },
  })

  return (
    <SidebarLayout handleBack={handleSubmit}>
      <div className="px-4 sm:px-6 flex-1">
        <Text variant="sectionHeading"> Payment Method</Text>
        <div>
          <div className={s.fieldset}>
            <label className={s.label}>Cardholder Name</label>
            <input
              className={s.input}
              name='cardholderName'
              onChange={updateAddressData}
              value={address.cardholderName}
            />
          </div>
          <div className="grid gap-3 grid-flow-row grid-cols-12">
            <div className={cn(s.fieldset, 'col-span-7')}>
              <label className={s.label}>Card Number</label>
              <CardNumberElement className={s.input} />
            </div>
            <div className={cn(s.fieldset, 'col-span-3')}>
              <label className={s.label}>Expires</label>
              <CardExpiryElement className={s.input} placeholder='MM/YY' />
            </div>
            <div className={cn(s.fieldset, 'col-span-2')}>
              <label className={s.label}>CVC</label>
              <CardCvcElement className={s.input} />
            </div>
          </div>
          <hr className="border-accent-2 my-6" />
          <div className="grid gap-3 grid-flow-row grid-cols-12">
            <div className={cn(s.fieldset, 'col-span-6')}>
              <label className={s.label}>First Name</label>
              <input
                className={s.input}
                name='firstName'
                onChange={updateAddressData}
                value={address.firstName}
              />
            </div>
            <div className={cn(s.fieldset, 'col-span-6')}>
              <label className={s.label}>Last Name</label>
              <input
                className={s.input}
                name='lastName'
                onChange={updateAddressData}
                value={address.lastName}
              />
            </div>
          </div>
          <div className={s.fieldset}>
            <label className={s.label}>Company (Optional)</label>
            <input
              className={s.input}
              name='company'
              onChange={updateAddressData}
              value={address.company}
            />
          </div>
          <div className={s.fieldset}>
            <label className={s.label}>Street and House Number</label>
            <input
              className={s.input}
              name='addressLine1'
              onChange={updateAddressData}
              value={address.addressLine1}
            />
          </div>
          <div className={s.fieldset}>
            <label className={s.label}>Apartment, Suite, Etc. (Optional)</label>
            <input
              className={s.input}
              name='addressLine2'
              onChange={updateAddressData}
              value={address.addressLine2}
            />
          </div>
          <div className="grid gap-3 grid-flow-row grid-cols-12">
            <div className={cn(s.fieldset, 'col-span-6')}>
              <label className={s.label}>Postal Code</label>
              <input
                className={s.input}
                name='postalCode'
                onChange={updateAddressData}
                value={address.postalCode}
              />
            </div>
            <div className={cn(s.fieldset, 'col-span-6')}>
              <label className={s.label}>City</label>
              <input
                className={s.input}
                name='city'
                onChange={updateAddressData}
                value={address.city}
              />
            </div>
          </div>
          <div className={s.fieldset}>
            <label className={s.label}>Country/Region</label>
            <select
              className={s.select}
              name='countryOrRegion'
              onChange={updateAddressData}
              value={address.countryOrRegion}
            >
              {countries.map((country) => (
                <option
                  key={country.code}
                  value={country.code}
                >
                  {country.name}
                </option>
              ))}
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
