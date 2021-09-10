import React from "react"
import s from './DeliveryItem.module.scss'

import IdAndStatus from './components/IdAndStatus/IdAndStatus'
import Products from './components/Products/Products'
import TotalPrice from './components/TotalPrice/TotalPrice'
import ReOrder from './components/ReOrder/ReOrder'


interface DeliveryItemProps {
    id: string;
    status: "waiting" | "delivering" | "delivered";
    products: string[];
    totalPrice: number;
    reOrderLink?: string;
}

const DeliveryItem = ({ id, status, products, totalPrice, reOrderLink } : DeliveryItemProps) => {
    return (
        <section className={s.deliveryItem}>
            <IdAndStatus id={id} status={status} />
            <div className={s.separator}></div>
            <Products products={products} />
            <TotalPrice totalPrice={totalPrice} />
            <ReOrder show={status==="delivered" ? true : false} href={reOrderLink} />
        </section>
    )
}

export default DeliveryItem