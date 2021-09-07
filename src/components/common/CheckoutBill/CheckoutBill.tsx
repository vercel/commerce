import React from 'react'
import s from "./CheckoutBill.module.scss"
import { CardItemCheckout } from '..'
import { CardItemCheckoutProps } from '../CardItemCheckout/CardItemCheckout'

interface CheckoutBillProps {
    data: CardItemCheckoutProps[]
}

const CheckoutBill = ({data}: CheckoutBillProps) => {
    return (
        <div className={s.warpper}>
            <div className={s.list}>
                {data.map((item,index)=>{
                    return <CardItemCheckout {...item} key={index}/>
                })}
            </div>
            <div className={s.bot}>
                <div className={s.promo}>
                    
                </div>
                <div className={s.price}>
    
                </div>
            </div>
        </div>
    )
}

export default CheckoutBill
