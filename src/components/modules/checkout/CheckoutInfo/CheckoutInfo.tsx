import React, { useEffect, useState } from 'react'
import { Logo } from 'src/components/common'
import CheckoutCollapse from 'src/components/common/CheckoutCollapse/CheckoutCollapse'
import { useActiveCustomer } from 'src/components/hooks/auth'
import useGetActiveOrderForCheckout from 'src/components/hooks/order/useGetActiveOrderForCheckout'
import s from './CheckoutInfo.module.scss'
import CustomerInfoForm from './components/CustomerInfoForm/CustomerInfoForm'
import PaymentInfoForm from './components/PaymentInfoForm/PaymentInfoForm'
import ShippingInfoForm from './components/ShippingInfoForm/ShippingInfoForm'
import ShippingMethod from './components/ShippingMethod/ShippingMethod'
interface CheckoutInfoProps {
  onViewCart: () => void
  currency?: string
}

export enum CheckoutStep {
  CustomerInfo = 1,
  ShippingAddressInfo = 2,
  ShippingMethodInfo = 3,
  PaymentInfo = 4,
}

const CheckoutInfo = ({ onViewCart, currency = "" }: CheckoutInfoProps) => {
  const [activeStep, setActiveStep] = useState(1)
  const [doneSteps, setDoneSteps] = useState<CheckoutStep[]>([])
  const { order } = useGetActiveOrderForCheckout()
  const { customer } = useActiveCustomer()
  console.log("active order checkout: ", order)

  useEffect(() => {
    if (customer) {
      if (!doneSteps.includes(CheckoutStep.CustomerInfo)) {

        if (doneSteps.length > 0) {
          for (let i = CheckoutStep.CustomerInfo + 1; i <= Object.keys(CheckoutStep).length; i++) {
            if (!doneSteps.includes(i)) {
              setActiveStep(i)
            }
          }
        } else {
          setActiveStep(CheckoutStep.CustomerInfo + 1)
        }

        setDoneSteps([...doneSteps, CheckoutStep.CustomerInfo])
      }
    }
  }, [customer, doneSteps])


  const onEdit = (id: CheckoutStep) => {
    setActiveStep(id)
  }

  const updateActiveStep = (step: CheckoutStep) => {
    if (doneSteps.length > 0) {
      for (let i = step + 1; i < Object.keys(CheckoutStep).length; i++) {
        if (!doneSteps.includes(i)) {
          setActiveStep(i)
          return
        }
      }
    } else {
      setActiveStep(step + 1)
    }
  }

  const onConfirm = (step: CheckoutStep) => {
    if (step + 1 > formList.length) {
      // TODO: checkout
      console.log("finish: ", order)
    } else {
      updateActiveStep(step)
      setDoneSteps([...doneSteps, step])
    }
  }


  const getNote = (id: CheckoutStep) => {
    switch (id) {
      case CheckoutStep.CustomerInfo:
        if (order?.customer?.emailAddress) {
          return `${order?.customer?.firstName} ${order?.customer?.lastName}, ${order?.customer?.emailAddress}`
        } else if (customer) {
          return `${customer.firstName} ${customer.lastName}, ${customer.emailAddress}`
        } else {
          return ''
        }
      case CheckoutStep.ShippingAddressInfo:
        if (order?.shippingAddress) {
          const { streetLine1, city, province, postalCode, countryCode, phoneNumber } = order.shippingAddress
          return `${streetLine1}, ${city}, ${province}, ${postalCode}, ${countryCode}, ${phoneNumber}`
        }
        return ''
      default:
        return ""
    }
  }

  const formList = [
    {
      id: CheckoutStep.CustomerInfo,
      title: 'Customer Information',
      form: <CustomerInfoForm onConfirm={onConfirm} id={CheckoutStep.CustomerInfo} activeStep={activeStep} />,
    },
    {
      id: CheckoutStep.ShippingAddressInfo,
      title: 'Shipping Address Information',
      form: <ShippingInfoForm onConfirm={onConfirm} id={CheckoutStep.ShippingAddressInfo} activeStep={activeStep}/>,
    },
    {
      id: CheckoutStep.ShippingMethodInfo,
      title: 'Shipping Method Information',
      form: <ShippingMethod onConfirm={onConfirm} currency={currency} />,
    },
    {
      id: CheckoutStep.PaymentInfo,
      title: 'Payment Information',
      form: <PaymentInfoForm onConfirm={onConfirm} id={CheckoutStep.PaymentInfo} />,
    },
  ]

  return (
    <div className={s.warpper}>
      <div className={s.title}>
        <Logo />
        <div className={s.viewCart} onClick={onViewCart}>View cart</div>
      </div>
      {formList.map((item) => {
        let note = getNote(item.id)
        return <CheckoutCollapse
          key={item.title}
          id={item.id}
          visible={item.id === activeStep}
          title={item.title}
          onEditClick={onEdit}
          isEdit={doneSteps.includes(item.id)}
          onClose={onConfirm}
          note={note}
          disableEdit={customer && item.id === CheckoutStep.CustomerInfo}
        >
          {item.form}
        </CheckoutCollapse>
      })}
    </div>
  )
}

export default CheckoutInfo
