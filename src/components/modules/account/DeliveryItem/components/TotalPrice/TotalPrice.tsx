import React from "react"
import s from './TotalPrice.module.scss'


interface TotalPriceProps {
    totalPrice: number;
}

const TotalPrice = ({ totalPrice } : TotalPriceProps) => {
    return (
        <section className={s.totalPrice}>
            <div className="text-right">Total</div>
            <div className={s.price}>Rp {totalPrice}</div>
        </section>
    )
}

export default TotalPrice