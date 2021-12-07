import React from "react"
import s from './DeliveryItem.module.scss'

import IdAndStatus from './components/IdAndStatus/IdAndStatus'
import Products from './components/Products/Products'
import TotalPrice from './components/TotalPrice/TotalPrice'
import ReOrder from './components/ReOrder/ReOrder'
import { OrderLine } from "@framework/schema"


interface DeliveryItemProps {
    code?: string;
    status?: string;
    products?: OrderLine[];
    totalPrice?: number;
    currencyCode?:string;
    showModelError?:()=>void,
    messageErr?: (value:React.ReactNode)=>void
}
const DeliveryItem = ({code, status, products,currencyCode , totalPrice, showModelError, messageErr } : DeliveryItemProps) => {
    
    return (
        <section className={s.deliveryItem}>
            <IdAndStatus code={code} status={status} />
            <div className={s.separator}></div>
            <Products products={products} />
            <TotalPrice currencyCode={currencyCode} totalPrice={totalPrice} />
    
            <ReOrder messageErr={messageErr} showModelError={showModelError} products={products} visible={status === "Delivered" ? true : false}/>
            
        </section>
    )
}

export default DeliveryItem