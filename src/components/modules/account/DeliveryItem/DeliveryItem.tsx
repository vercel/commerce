import React from "react"
import s from './DeliveryItem.module.scss'

import IdAndStatus from './components/IdAndStatus/IdAndStatus'
import Products from './components/Products/Products'
import TotalPrice from './components/TotalPrice/TotalPrice'
import ReOrder from './components/ReOrder/ReOrder'


interface DeliveryItemProps {
    id: string;
    status: "Waiting" | "Delivering" | "Delivered";
    products: string[];
    totalPrice: number;
}

const DeliveryItem = ({ id, status, products, totalPrice } : DeliveryItemProps) => {
    return (
        <section className={s.deliveryItem}>
            <IdAndStatus id={id} status={status} />
            <div className={s.separator}></div>
            <Products products={products} />
            <TotalPrice totalPrice={totalPrice} />
            <ReOrder show={status === "Delivered" ? true : false}/>
        </section>
    )
}

export default DeliveryItem