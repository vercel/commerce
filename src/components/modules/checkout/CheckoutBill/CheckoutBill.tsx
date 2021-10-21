import { CartCheckout } from '@commerce/types/cart'
import Link from 'next/link'
import React from 'react'
import { ROUTE } from 'src/utils/constanst.utils'
import { LANGUAGE } from 'src/utils/language.utils'
import { ButtonCommon, CardItemCheckout, EmptyCommon } from '../../../common'
import s from './CheckoutBill.module.scss'
import FormPromotionCode from './FormPromotionCode/FormPromotionCode'

interface CheckoutBillProps {
  // data: CardItemCheckoutProps[]
  data: CartCheckout | null
}

const CheckoutBill = ({ data }: CheckoutBillProps) => {
  return (
    <div className={s.warpper}>
      <div className={s.title}>
        Your cart ({data?.totalQuantity || 0})
      </div>
      {
        !data?.totalQuantity && <div className={s.empty}>
          <EmptyCommon description="Your cart is empty" />
          <Link href={ROUTE.HOME}>
            <a>
              <ButtonCommon>{LANGUAGE.BUTTON_LABEL.SHOP_NOW}</ButtonCommon>
            </a>
          </Link>
        </div>
      }
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
            <div className={s.shipping}>
              {data?.totalDiscount || 0} {data?.currency?.code}
            </div>
          </div>
          <div className={s.line}>
            Subtotal
            <div className={s.subTotal}>
              {data?.subtotalPrice || 0} {data?.currency?.code}
            </div>
          </div>
          <div className={s.line}>
            Shipping
            <div className={s.shipping}>{data?.shippingLine.priceWithTax || 0}  {data?.currency?.code}</div>
          </div>
          <div className={s.line}>
            Estimated Total
            <div className={s.total}>{data?.totalPrice || 0} {data?.currency?.code}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutBill
