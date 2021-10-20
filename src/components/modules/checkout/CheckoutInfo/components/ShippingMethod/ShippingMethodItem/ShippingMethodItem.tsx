import React, { memo } from 'react'
import s from './ShippingMethodItem.module.scss'

interface Props {
  id: string
  name: string
  price: number
  currency: string
  onSelect: (id: string) => void
}

const ShippingMethodItem = memo(({ id, name, price, currency, onSelect }: Props) => {
  const handleSelect = () => {
    onSelect(id)
  }
  return (
    <li className={s.shippingMethodItem} key={id} onClick={handleSelect}>
      <div className={s.name}>
        {name}
      </div>
      <div className={s.price}>
        {price ? `${price / 100} ${currency}` : "Free"}
      </div>
    </li>
  )
})

ShippingMethodItem.displayName = 'ShippingMethodItem'
export default ShippingMethodItem
