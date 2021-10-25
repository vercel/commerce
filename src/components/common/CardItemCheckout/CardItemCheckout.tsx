import { LineItem } from '@commerce/types/cart'
import React from 'react'
import { ImgWithLink } from '..'
import s from "./CardItemCheckout.module.scss"
export interface CardItemCheckoutProps extends LineItem {
    currency: { code: string }
}

const CardItemCheckout = ({
    quantity,
    variant,
    name,
    currency }: CardItemCheckoutProps) => {
    return (
        <div className={s.warpper}>
            <div className={s.image}>
                <ImgWithLink src={variant?.image?.url ?? ''} alt={name} />
            </div>
            <div className={s.right}>
                <div className={s.name}>
                    {name} {variant?.weight ? `(${variant.weight})` : ''}
                </div>
                <div className={s.quantity}>
                    Quantity:
                    <div className={s.price}>
                        {`${quantity} x ${variant?.price} ${currency?.code}`}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardItemCheckout
