import React from "react"
import s from './DeliveryItem.module.scss'

import IdAndStatus from './components/IdAndStatus/IdAndStatus'
import Products from './components/Products/Products'
import TotalPrice from './components/TotalPrice/TotalPrice'
import ReOrder from './components/ReOrder/ReOrder'
import { OrderLine } from "@framework/schema"


interface DeliveryItemProps {
    id: string;
    status?: string;
    products?: OrderLine[];
    totalPrice?: number;
    currencyCode?:string;
}

const DeliveryItem = ({ id, status, products,currencyCode , totalPrice } : DeliveryItemProps) => {
    return (
        <section className={s.deliveryItem}>
            <IdAndStatus id={id} status={status} />
            <div className={s.separator}></div>
            <Products products={products} />
            <TotalPrice currencyCode={currencyCode} totalPrice={totalPrice} />
            <ReOrder visible={status === "delivered" ? true : false}/>
        </section>
    )
}

export default DeliveryItem