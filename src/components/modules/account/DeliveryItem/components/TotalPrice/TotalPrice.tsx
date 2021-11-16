import React from "react"
import s from './TotalPrice.module.scss'


interface TotalPriceProps {
    totalPrice?: number;
    currencyCode?:string;
}

const TotalPrice = ({ totalPrice,currencyCode } : TotalPriceProps) => {
    return (
        <section className={s.totalPrice}>
            <div className="text-right">Total</div>
            <div className={s.price}>{totalPrice} {currencyCode} </div>
        </section>
    )
}

export default TotalPrice