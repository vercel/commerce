import classNames from 'classnames'
import React, { memo } from 'react'
import { IconCheck } from 'src/components/icons'
import s from './ShippingMethodItem.module.scss'

interface Props {
  id: string
  name: string
  price: number
  currency: string
  onSelect: (id: string) => void
  isActive: boolean

}

const ShippingMethodItem = memo(({ id, name, price, currency, isActive, onSelect }: Props) => {
  const handleSelect = () => {
    onSelect(id)
  }
  return (
    <li className={s.shippingMethodItem} key={id} onClick={handleSelect}>
      <div className={s.left}>
        <div className={classNames(s.icon, { [s.show]: isActive })}>
          <IconCheck />
        </div>
        <div className={s.name}>
          {name}
        </div>
      </div>
      <div className={s.price}>
        {price ? `${price / 100} ${currency}` : "Free"}
      </div>
    </li>
  )
})

ShippingMethodItem.displayName = 'ShippingMethodItem'
export default ShippingMethodItem
