import React from 'react'
import { CardItemCheckout } from '../../../common'
import { CardItemCheckoutProps } from '../../../common/CardItemCheckout/CardItemCheckout'
import s from './CheckoutBill.module.scss'
import FormPromotionCode from './FormPromotionCode/FormPromotionCode'

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
        <FormPromotionCode/>
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
