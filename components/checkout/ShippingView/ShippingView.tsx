import { FC } from 'react'
import cn from 'classnames'
import s from './ShippingView.module.css'
import Button from '@components/ui/Button'
import { useUI } from '@components/ui/context'
import SidebarLayout from '@components/common/SidebarLayout'
import countries from '@lib/countries'
import useAddShippingAddress from '@framework/cart/use-add-shipping-address'

const PaymentMethodView: FC = () => {
  const addShippingAddress = useAddShippingAddress()
  const {
    paymentMethodDetails,
    setShippingAddress,
    setSidebarView,
    setUseBillingAddressForShipping,
    shippingAddress,
    useBillingAddressForShipping,
  } = useUI()

  const handleUseBillingAddressForShipping = (event) => {
    setUseBillingAddressForShipping(event.target.value === 'true')

    if (event.target.value === 'true') {
      setShippingAddress({
        firstName: paymentMethodDetails.address?.firstName,
        lastName: paymentMethodDetails.address?.lastName,
        company: paymentMethodDetails.address?.company,
        addressLine1: paymentMethodDetails.address?.addressLine1,
        addressLine2: paymentMethodDetails.address?.addressLine2,
        postalCode: paymentMethodDetails.address?.postalCode,
        city: paymentMethodDetails.address?.city,
        country: paymentMethodDetails.address?.country,
      })
    }
  }

  const updateAddressData = ({ target }: any) => setShippingAddress({
    ...shippingAddress,
    [target.name]: target.value,
  })

  return (
    <SidebarLayout handleBack={async () => {
      // add shipping address to cart
      await addShippingAddress({ address: shippingAddress })
      setSidebarView('CHECKOUT_VIEW')
    }}>
      <div className="px-4 sm:px-6 flex-1">
        <h2 className="pt-1 pb-8 text-2xl font-semibold tracking-wide cursor-pointer inline-block">
          Shipping
        </h2>
        <div>
          <div className="flex flex-row my-3 items-center">
            <input
              className={s.radio}
              type="radio"
              id="useBillingAddressForShippingTrue"
              name="useBillingAddressForShipping"
              value="true"
              onChange={handleUseBillingAddressForShipping}
              checked={useBillingAddressForShipping === true}
            />
            <label htmlFor="useBillingAddressForShippingTrue" className="ml-3 text-sm">Same as billing address</label>
          </div>
          <div className="flex flex-row my-3 items-center">
            <input
              className={s.radio}
              type="radio"
              id="useBillingAddressForShippingFalse"
              name="useBillingAddressForShipping"
              value="false"
              onChange={handleUseBillingAddressForShipping}
              checked={useBillingAddressForShipping === false}
            />
            <label htmlFor="useBillingAddressForShippingFalse" className="ml-3 text-sm">
              Use a different shipping address
            </label>
          </div>
          <hr className="border-accent-2 my-6" />
          <div className="grid gap-3 grid-flow-row grid-cols-12">
            <div className={cn(s.fieldset, 'col-span-6')}>
              <label className={s.label}>First Name</label>
              <input
                className={s.input}
                name='firstName'
                onChange={updateAddressData}
                value={shippingAddress.firstName}
                disabled={useBillingAddressForShipping}
              />
            </div>
            <div className={cn(s.fieldset, 'col-span-6')}>
              <label className={s.label}>Last Name</label>
              <input
                className={s.input}
                name='lastName'
                onChange={updateAddressData}
                value={shippingAddress.lastName}
                disabled={useBillingAddressForShipping}
              />
            </div>
          </div>
          <div className={s.fieldset}>
            <label className={s.label}>Phone Number</label>
            <input
              className={s.input}
              name='phone'
              onChange={updateAddressData}
              value={shippingAddress.phone}
              disabled={useBillingAddressForShipping}
              type='tel'
            />
          </div>
          <div className={s.fieldset}>
            <label className={s.label}>Company (Optional)</label>
            <input
              className={s.input}
              name='company'
              onChange={updateAddressData}
              value={shippingAddress.company}
              disabled={useBillingAddressForShipping}
            />
          </div>
          <div className={s.fieldset}>
            <label className={s.label}>Street and House Number</label>
            <input
              className={s.input}
              name='addressLine1'
              onChange={updateAddressData}
              value={shippingAddress.addressLine1}
              disabled={useBillingAddressForShipping}
            />
          </div>
          <div className={s.fieldset}>
            <label className={s.label}>Apartment, Suite, Etc. (Optional)</label>
            <input
              className={s.input}
              name='addressLine2'
              onChange={updateAddressData}
              value={shippingAddress.addressLine2}
              disabled={useBillingAddressForShipping}
            />
          </div>
          <div className="grid gap-3 grid-flow-row grid-cols-12">
            <div className={cn(s.fieldset, 'col-span-6')}>
              <label className={s.label}>Postal Code</label>
              <input
                className={s.input}
                name='postalCode'
                onChange={updateAddressData}
                value={shippingAddress.postalCode}
                disabled={useBillingAddressForShipping}
              />
            </div>
            <div className={cn(s.fieldset, 'col-span-6')}>
              <label className={s.label}>City</label>
              <input
                className={s.input}
                name='city'
                onChange={updateAddressData}
                value={shippingAddress.city}
                disabled={useBillingAddressForShipping}
              />
            </div>
          </div>
          <div className={s.fieldset}>
            <label className={s.label}>Region</label>
            <input
              className={s.input}
              name='region'
              onChange={updateAddressData}
              value={shippingAddress.region}
              disabled={useBillingAddressForShipping}
            />
          </div>
          <div className={s.fieldset}>
            <label className={s.label}>Country</label>
            <select
              className={s.select}
              name="country"
              onChange={updateAddressData}
              value={shippingAddress.country}
              disabled={useBillingAddressForShipping}

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
