import React, { useEffect, useState } from 'react'
import { ButtonCommon, Logo } from 'src/components/common'
import CheckoutCollapse from 'src/components/common/CheckoutCollapse/CheckoutCollapse'
import { useActiveCustomer } from 'src/components/hooks/auth'
import { useAddProductToCart, useGetActiveOrder } from 'src/components/hooks/cart'
import { removeItem } from 'src/utils/funtion.utils'
import { CheckOutForm } from 'src/utils/types.utils'
import s from './CheckoutInfo.module.scss'
import CustomerInfoForm from './components/CustomerInfoForm/CustomerInfoForm'
import PaymentInfoForm from './components/PaymentInfoForm/PaymentInfoForm'
import ShippingInfoForm from './components/ShippingInfoForm/ShippingInfoForm'
interface CheckoutInfoProps {
  onViewCart: () => void
}

enum CheckoutStep {
  CustomerInfo = 1,
  ShippingInfo = 2,
  PaymentInfo = 3,
}

const CheckoutInfo = ({ onViewCart }: CheckoutInfoProps) => {
  const [activeStep, setActiveStep] = useState(1)
  const [doneSteps, setDoneSteps] = useState<CheckoutStep[]>([])
  const [info, setInfo] = useState<CheckOutForm>({})
  const { order } = useGetActiveOrder()
  const { customer } = useActiveCustomer()

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
    setDoneSteps(removeItem<number>(doneSteps, id))
  }

  const updateActiveStep = (step: CheckoutStep) => {
    if (doneSteps.length > 0) {
      for (let i = step + 1; i <= Object.keys(CheckoutStep).length; i++) {
        if (!doneSteps.includes(i)) {
          setActiveStep(i)
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
        // console.log("order info; ", order?.customer)
        if (order?.customer) {
          return `${order?.customer?.firstName} ${order?.customer?.lastName}, ${order?.customer?.emailAddress}`
        } else if (customer) {
          return `${customer.firstName} ${customer.lastName}, ${customer.emailAddress}`
        } else {
          return ''
        }
      case CheckoutStep.ShippingInfo:
        return `${info.address}, ${info.state}, ${info.city}, ${info.code}, ${info.phone}, `
      default:
        return ""
    }
  }

  const formList = [
    {
      id: CheckoutStep.CustomerInfo,
      title: 'Customer Information',
      form: <CustomerInfoForm onConfirm={onConfirm} id={CheckoutStep.CustomerInfo}/>,
    },
    {
      id: CheckoutStep.ShippingInfo,
      title: 'Shipping Information',
      form: <ShippingInfoForm onConfirm={onConfirm} id={CheckoutStep.ShippingInfo} activeStep={activeStep}/>,
    },
    {
      id: CheckoutStep.PaymentInfo,
      title: 'Payment Information',
      form: <PaymentInfoForm onConfirm={onConfirm} id={CheckoutStep.PaymentInfo} />,
    },
  ]

  // TODO: remove
  const { addProduct } = useAddProductToCart()

  const createOrder = () => {
    addProduct({ variantId: "63", quantity: 1 }, handleAddToCartCallback)
  }
  const handleAddToCartCallback = (isSuccess: boolean, message?: string) => {
    // console.log("after create order: ", isSuccess, message)
  }


  return (
    <div className={s.warpper}>
      {/* TODO: remove */}
      <ButtonCommon onClick={createOrder}>test create order</ButtonCommon>
      <ButtonCommon onClick={createOrder}>test get activeStep order</ButtonCommon>


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
