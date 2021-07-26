import { FC, useState } from 'react'
import cn from 'classnames'
import s from './ShippingView.module.css'
import { Button, Input } from '@components/ui'
import { useUI } from '@components/ui/context'
import SidebarLayout from '@components/common/SidebarLayout'

import { v4 as uuid } from 'uuid'
import { setCustomerForOrderMutation } from '@framework/utils/mutations/set-customer-for-order-mutation'
import { setOrderShippingAddressMutation } from '@framework/utils/mutations/set-order-shipping-address-mutation'
import request from '@commerce/utils/request'

const PaymentMethodView: FC = () => {
  // Form State
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [streetDetails, setStreetDetails] = useState('')
  const [apartmentDetails, setApartmentDetails] = useState('')
  const [loading, setLoading] = useState(false)

  const { setSidebarView } = useUI()

  const setCustomerForOrder = async () => {
    console.log('Setting customer')
    const data = await request({
      query: setCustomerForOrderMutation,
      variables: {
        input: {
          title: `${firstName} ${lastName}`,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          emailAddress: `${email}+${uuid().split('-')[0]}`
        }
      }
    })
    console.log(data, 111)
  }
  const addShippingAddress = async () => {
    console.log('Add shipping address')
    const data = await request({
      query: setOrderShippingAddressMutation,
      variables: {
        input: {
          fullName: `${firstName} ${lastName}`,
          phoneNumber: phoneNumber,
          streetLine1: streetDetails,
          streetLine2: apartmentDetails,
          countryCode: "TM"
        }
      }
    })
    console.log(data, 222)
  }

  const handleAddShippingAddress = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    console.log('Handle Add Shipping Address')

    try {
      setLoading(true)
      await setCustomerForOrder()
      await addShippingAddress()
      setLoading(false)
      setSidebarView('CHECKOUT_VIEW')
    } catch ({ errors }) {
      console.log(errors, 333)  
    }
    
  }
  return (
    <SidebarLayout handleBack={() => setSidebarView('CHECKOUT_VIEW')}>
      <form
        onSubmit={handleAddShippingAddress}
      >
        <div className="px-4 sm:px-6 flex-1">
          <h2 className="pt-1 pb-8 text-2xl font-semibold tracking-wide cursor-pointer inline-block">
            Shipping
          </h2>
          
            <div>
              {/* <div className="flex flex-row my-3 items-center">
                <input className={s.radio} type="radio" />
                <span className="ml-3 text-sm">Same as billing address</span>
              </div>
              <div className="flex flex-row my-3 items-center">
                <input className={s.radio} type="radio" />
                <span className="ml-3 text-sm">
                  Use a different shipping address
                </span>
              </div>
              <hr className="border-accent-2 my-6" /> */}
              <div className="grid gap-3 grid-flow-row grid-cols-12">
                <div className={cn(s.fieldset, 'col-span-6')}>
                  <label className={s.label}>First Name</label>
                  <Input className={s.input} onChange={setFirstName} />
                </div>
                <div className={cn(s.fieldset, 'col-span-6')}>
                  <label className={s.label}>Last Name</label>
                  <Input className={s.input} onChange={setLastName} />
                </div>
              </div>
              <div className={s.fieldset}>
                <label className={s.label}>Phone Number</label>
                <Input className={s.input} onChange={setPhoneNumber} />
              </div>
              <div className={s.fieldset}>
                <label className={s.label}>Email</label>
                <Input className={s.input} onChange={setEmail} />
              </div>
              <div className={s.fieldset}>
                <label className={s.label}>Street and House Number</label>
                <Input className={s.input} onChange={setStreetDetails} />
              </div>
              <div className={s.fieldset}>
                <label className={s.label}>Apartment, Suite, Etc. (Optional)</label>
                <Input className={s.input} onChange={setApartmentDetails} />
              </div>
              {/* <div className="grid gap-3 grid-flow-row grid-cols-12">
                <div className={cn(s.fieldset, 'col-span-6')}>
                  <label className={s.label}>Postal Code</label>
                  <input className={s.input} />
                </div>
                <div className={cn(s.fieldset, 'col-span-6')}>
                  <label className={s.label}>City</label>
                  <input className={s.input} />
                </div>
              </div> */}
              {/* <div className={s.fieldset}>
                <label className={s.label}>Country/Region</label>
                <select className={s.select}>
                  <option>Hong Kong</option>
                </select>
              </div> */}
            </div>
        </div>
        <div className="sticky z-20 bottom-0 w-full right-0 left-0 py-12 bg-accent-0 border-t border-accent-2 px-6">
          <Button
            variant="ghost"
            type="submit"
            loading={loading}
            width="100%"
          >
            Continue
          </Button>
        </div>
      </form>
    </SidebarLayout>
  )
}

export default PaymentMethodView
