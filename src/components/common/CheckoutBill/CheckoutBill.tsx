import React from 'react'
import s from './CheckoutBill.module.scss'
import { CardItemCheckout } from '..'
import { CardItemCheckoutProps } from '../CardItemCheckout/CardItemCheckout'
import { IconCirclePlus } from 'src/components/icons'

interface CheckoutBillProps {
  data: CardItemCheckoutProps[]
}

const CheckoutBill = ({ data }: CheckoutBillProps) => {
  return (
    <div className={s.warpper}>
    <div className = {s.title}>
        Your cart ({data.length})
    </div>
      <div className={s.list}>
        {data.map((item) => {
          return <CardItemCheckout {...item} key={item.slug} />
        })}
      </div>
      <div className={s.bot}>
        <div className={s.promo}>
          Apply Promotion Code
          <IconCirclePlus />
        </div>
        <div className={s.price}>
          <div className={s.line}>
            Subtotal
            <div className={s.subTotal}>RP 120.500</div>
          </div>
          <div className={s.line}>
            Shipping
            <div className={s.shipping}>Free</div>
          </div>
          <div className={s.line}>
            Estimated Total
            <div className={s.total}>RP 120.500</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutBill
