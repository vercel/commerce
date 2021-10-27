import { ShippingMethodQuote } from '@framework/schema'
import React, { memo, useEffect, useState } from 'react'
import { ButtonCommon } from 'src/components/common'
import { useMessage } from 'src/components/contexts'
import { useEligibleShippingMethods, useSetOrderShippingMethod, useTransitionToArrangingPayment } from 'src/components/hooks/order'
import { Shipping } from 'src/components/icons'
import { CheckoutStep } from '../../CheckoutInfo'
import ChekoutNotePolicy from '../ChekoutNotePolicy/ChekoutNotePolicy'
import s from './ShippingMethod.module.scss'
import ShippingMethodItem from './ShippingMethodItem/ShippingMethodItem'

interface Props {
  currency: string
  onConfirm: (id: number) => void

}

const ShippingMethod = memo(({ currency, onConfirm }: Props) => {
  const { showMessageError } = useMessage()
  const { eligibleShippingMethods } = useEligibleShippingMethods()
  const { setOrderShippingMethod } = useSetOrderShippingMethod()
  const [selectedValue, setSelectedValue] = useState<ShippingMethodQuote | undefined>(eligibleShippingMethods ? eligibleShippingMethods[0] : undefined)
  const { transitionToArrangingPayment } = useTransitionToArrangingPayment()

  useEffect(() => {
    if (eligibleShippingMethods?.length > 0 && !selectedValue) {
      setSelectedValue(eligibleShippingMethods[0])
    }
  }, [eligibleShippingMethods, selectedValue])

  const onChange = (id: string) => {
    const newValue = eligibleShippingMethods?.find(item => item.id === id)
    if (newValue) {
      setSelectedValue(newValue)
    }
  }

  const handleSubmit = () => {
    if (selectedValue) {
      setOrderShippingMethod(selectedValue?.id, onSubmitCalBack)
    } else {
      showMessageError('Please choose a Shipping Method')
    }
  }

  const onSubmitCalBack = (isSuccess: boolean, msg?: string) => {
    if (isSuccess) {
      transitionToArrangingPayment(onTransitionCallBack)
    } else {
      showMessageError(msg)
    }
  }

  const onTransitionCallBack = (isSuccess: boolean, msg?: string) => {
    if (isSuccess) {
      onConfirm(CheckoutStep.ShippingMethodInfo)
    } else {
      showMessageError(msg)
    }
  }

  
  return (
    <div className={s.shippingMethod}>
      <div className={s.method}>
        <div className={s.left}>
          <div className={s.icon}>
            <Shipping />
          </div>
          <div className={s.name}>
            {selectedValue?.name}
          </div>
        </div>
        <div className={s.right}>
          <div className={s.price}>
            {selectedValue?.price ? `${selectedValue?.price / 100} ${currency}` : "Free"}
          </div>
        </div>
      </div>
      <div className={s.options}>
        <ul>
          {eligibleShippingMethods?.map(item => <ShippingMethodItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            currency={currency}
            isActive={selectedValue?.id === item.id}
            onSelect={onChange}
          />)}
        </ul>
      </div>
      <div className={s.bottom}>
        <ChekoutNotePolicy />
        <div className={s.button}>
          <ButtonCommon onClick={handleSubmit}>
            Continue to Payment
          </ButtonCommon>
        </div>
      </div>
    </div>
  )
})

ShippingMethod.displayName = 'ShippingMethod'
export default ShippingMethod
