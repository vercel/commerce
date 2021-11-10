import React, { useEffect, useState } from 'react'
import { Logo } from 'src/components/common'
import CheckoutCollapse from 'src/components/common/CheckoutCollapse/CheckoutCollapse'
import { useMessage } from 'src/components/contexts'
import { useActiveCustomer } from 'src/components/hooks/auth'
import { useGetActiveOrderForCheckout } from 'src/components/hooks/order'
import useChangeOrderState from 'src/components/hooks/order/useChangeOrderState'
import { OrderState } from '../../../../utils/types.utils'
import s from './CheckoutInfo.module.scss'
import CustomerInfoForm from './components/CustomerInfoForm/CustomerInfoForm'
import PaymentInfoForm from './components/PaymentInfoForm/PaymentInfoForm'
import ShippingInfoForm from './components/ShippingInfoForm/ShippingInfoForm'
import ShippingMethod from './components/ShippingMethod/ShippingMethod'
interface CheckoutInfoProps {
  onViewCart: () => void
  currency?: string
  onChangeTemporaryShippingPrice: (price: number | null) => void
}

export enum CheckoutStep {
  CustomerInfo = 1,
  ShippingAddressInfo = 2,
  ShippingMethodInfo = 3,
  PaymentInfo = 4,
}

const CheckoutInfo = ({ onViewCart, currency = "", onChangeTemporaryShippingPrice }: CheckoutInfoProps) => {
  const [activeStep, setActiveStep] = useState(1)
  const [doneSteps, setDoneSteps] = useState<CheckoutStep[]>([])
  const { order } = useGetActiveOrderForCheckout()
  const { customer } = useActiveCustomer()
  const { changeOrderState } = useChangeOrderState()
  const { showMessageError } = useMessage()

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

  useEffect(() => {
    if (order?.state as OrderState === 'ArrangingPayment') {
      setActiveStep(CheckoutStep.PaymentInfo)
      setDoneSteps([CheckoutStep.CustomerInfo, CheckoutStep.ShippingAddressInfo, CheckoutStep.ShippingMethodInfo])
    }
  }, [order?.state])


  const onEdit = (id: CheckoutStep) => {
    if (activeStep === CheckoutStep.PaymentInfo && order?.state !== 'AddingItems') {
      changeOrderState('AddingItems', onChanegOrderStateToAddingItemsCallBack)
      setActiveStep(id)
    } else {
      setActiveStep(id)
    }
  }

  const onChanegOrderStateToAddingItemsCallBack = (isSuccess: boolean, message?: string) => {
    if (!isSuccess) {
      showMessageError(message)
      setActiveStep(CheckoutStep.PaymentInfo)
    }
  }

  const onChanegOrderStateToArrangingPaymentCallBack = (isSuccess: boolean, message?: string) => {
    if (!isSuccess) {
      showMessageError(message)
    }
  }

  const updateActiveStep = (step: CheckoutStep) => {
    let nextStep = CheckoutStep.ShippingAddressInfo

    if (doneSteps.length > 0) {
      for (let i = step + 1; i < Object.keys(CheckoutStep).length; i++) {
        if (!doneSteps.includes(i)) {
          nextStep = i
          break;
        }
      }
    } else {
      nextStep = step + 1
    }

    if (nextStep === CheckoutStep.PaymentInfo) {
      changeOrderState('ArrangingPayment', onChanegOrderStateToArrangingPaymentCallBack)
    } else {
      setActiveStep(nextStep)
    }
  }

  const onConfirm = (step: CheckoutStep) => {
    if (step + 1 <= formList.length) {
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
        if (order?.shippingAddress?.streetLine1) {
          const { streetLine1, city, province, postalCode, countryCode, phoneNumber } = order.shippingAddress
          return `${streetLine1}, ${city}, ${province}, ${postalCode}, ${countryCode}, ${phoneNumber}`
        }
        return ''
      case CheckoutStep.ShippingMethodInfo:
        if (order?.shippingLine?.shippingMethod) {
          return `${order?.shippingLine.shippingMethod.name}, ${order?.shippingLine.priceWithTax ? `${order?.shippingLine.priceWithTax} ${currency}` : 'Free'}` || ''
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
      form: <ShippingInfoForm onConfirm={onConfirm} id={CheckoutStep.ShippingAddressInfo} activeStep={activeStep} initialValues={order?.shippingAddress} />,
    },
    {
      id: CheckoutStep.ShippingMethodInfo,
      title: 'Shipping Method Information',
      form: <ShippingMethod onConfirm={onConfirm} currency={currency} initialValueId={order?.shippingLine?.shippingMethod?.id} onChangeTemporaryShippingPrice={onChangeTemporaryShippingPrice}/>,
    },
    {
      id: CheckoutStep.PaymentInfo,
      title: 'Payment Information',
      form: <PaymentInfoForm orderId={order?.id} />,
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
          disableEdit={(customer && item.id === CheckoutStep.CustomerInfo)}
        >
          {item.form}
        </CheckoutCollapse>
      })}
    </div>
  )
}

export default CheckoutInfo
