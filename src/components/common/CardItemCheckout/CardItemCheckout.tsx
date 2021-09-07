import React from 'react'
import s from "./CardItemCheckout.module.scss"
import { ProductProps } from 'src/utils/types.utils'
export interface CardItemCheckoutProps extends ProductProps {
    quantity:number
}

const CardItemCheckout = ({imageSrc,name,price,weight,quantity,category}: CardItemCheckoutProps) => {
    return (
        <div className={s.warpper}>
            <div className={s.image}>
                <img src={imageSrc} alt="image" />
            </div>
            <div className={s.right}>
                <div className={s.name}>
                    {`${name} (${weight})`}
                </div>
                <div className={s.quantity}>
                    Quantity: 
                    <div className={s.price}>
                        {`${quantity} x ${price}`}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardItemCheckout
