import { Cart } from '@commerce/types/cart'
import React from 'react'
import { CardItemCheckout } from '../../../common'
import s from './CheckoutBill.module.scss'
import FormPromotionCode from './FormPromotionCode/FormPromotionCode'

interface CheckoutBillProps {
  // data: CardItemCheckoutProps[]
  data: Cart | null
}

const CheckoutBill = ({ data }: CheckoutBillProps) => {
  // console.log("data here***: ", data)
  return (
    <div className={s.warpper}>
      <div className={s.title}>
        Your cart ({data?.totalQuantity})
      </div>
      <div className={s.list}>
        {data?.lineItems?.map((item) => {
          return <CardItemCheckout {...item} key={item.slug} currency={data?.currency} />
        })}
      </div>
      <div className={s.bot}>
        <FormPromotionCode />
        <div className={s.price}>
          <div className={s.line}>
            Discount {(data?.discounts?.length || 0) > 0 && `(${data?.discounts?.map(item => item.description).join(",")})`}
            <div className={s.shipping}>{data?.totalDiscount} {data?.currency?.code}</div>
          </div>
          <div className={s.line}>
            Subtotal
            <div className={s.subTotal}>{data?.subtotalPrice} {data?.currency?.code}</div>
          </div>
          <div className={s.line}>
            Shipping
            <div className={s.shipping}>Free</div>
          </div>
          <div className={s.line}>
            Estimated Total
            <div className={s.total}>{data?.totalPrice} {data?.currency?.code}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutBill
