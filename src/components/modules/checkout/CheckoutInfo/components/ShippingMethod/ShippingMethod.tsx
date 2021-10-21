import { ShippingMethodQuote } from '@framework/schema'
import React, { memo, useState } from 'react'
import { useMessage } from 'src/components/contexts'
import { useEligibleShippingMethods, useSetOrderShippingMethod } from 'src/components/hooks/order'
import { Shipping } from 'src/components/icons'
import { CheckoutStep } from '../../CheckoutInfo'
import s from './ShippingMethod.module.scss'
import ShippingMethodItem from './ShippingMethodItem/ShippingMethodItem'

interface Props {
  currency: string
  onConfirm: (id: number) => void

}

const ShippingMethod = memo(({ currency, onConfirm }: Props) => {
  const { eligibleShippingMethods } = useEligibleShippingMethods()
  const { setOrderShippingMethod } = useSetOrderShippingMethod()
  const [selectedValue, setSelectedValue] = useState<ShippingMethodQuote | undefined>(eligibleShippingMethods ? eligibleShippingMethods[0] : undefined)
  const { showMessageError } = useMessage()

  const onChange = (id: string) => {
    const newValue = eligibleShippingMethods?.find(item => item.id === id)
    if (newValue) {
      setSelectedValue(newValue)
      if (newValue?.id) {
        setOrderShippingMethod(newValue?.id, onSubmitCalBack)
      }
    }
  }

  const onSubmitCalBack = (isSuccess: boolean, msg?: string) => {
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
            onSelect={onChange}
          />)}
        </ul>
      </div>
    </div>
  )
})

ShippingMethod.displayName = 'ShippingMethod'
export default ShippingMethod
