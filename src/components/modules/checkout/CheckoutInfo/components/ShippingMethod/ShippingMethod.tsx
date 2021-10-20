import { ShippingMethodQuote } from '@framework/schema'
import classNames from 'classnames'
import React, { memo, useState } from 'react'
import { useMessage } from 'src/components/contexts'
import { useSetOrderShippingMethod } from 'src/components/hooks/order'
import { Shipping } from 'src/components/icons'
import s from './ShippingMethod.module.scss'
import ShippingMethodItem from './ShippingMethodItem/ShippingMethodItem'

const MOCKUP_DATA = [
  {
    "id": "1",
    "name": "Standard Shipping",
    "description": "",
    "price": 0,
    "priceWithTax": 0,
    "code": "standard-shipping"
  },
  {
    "id": "2",
    "name": "Express Shipping",
    "description": "",
    "price": 1000,
    "priceWithTax": 1000,
    "code": "express-shipping"
  }
]
interface Props {
  currency: string
}

const ShippingMethod = memo(({ currency }: Props) => {
  const { setOrderShippingMethod } = useSetOrderShippingMethod()
  const [selectedValue, setSelectedValue] = useState<ShippingMethodQuote>(MOCKUP_DATA[0])
  const { showMessageError } = useMessage()
  const [isShowOptions, setIsShowOptions] = useState<boolean>(false)

  const onChange = (id: string) => {
    const newValue = MOCKUP_DATA.find(item => item.id === id)
    if (newValue) {
      setSelectedValue(newValue)
      if (newValue?.id) {
        setOrderShippingMethod(newValue?.id, onSubmitCalBack)
      }
    }
    setIsShowOptions(false)
  }

  const onSubmitCalBack = (isSuccess: boolean, msg?: string) => {
    if (!isSuccess) {
      showMessageError(msg)
    }
  }

  const onCollapseOptions = () => {
    setIsShowOptions(!isShowOptions)
  }


  return (
    <div className={s.shippingMethod}>
      <div className={s.method} onClick={onCollapseOptions}>
        <div className={s.left}>
          <div className={s.icon}>
            <Shipping />
          </div>
          <div className={s.name}>
            {selectedValue.name}
          </div>
        </div>
        <div className={s.right}>
          <div className={s.price}>
            {selectedValue.price ? `${selectedValue.price / 100} ${currency}` : "Free"}
          </div>
        </div>
      </div>
      <div className={classNames(s.options, { [s.show]: isShowOptions })}>
        <ul>
          {MOCKUP_DATA.map(item => <ShippingMethodItem
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
