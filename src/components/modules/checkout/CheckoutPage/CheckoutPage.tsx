import React from 'react'
import { CHECKOUT_BILL_DATA } from 'src/utils/demo-data'
import { CheckoutBill, CheckoutInfo } from '..'
import s from "./CheckoutPage.module.scss"
interface CheckoutPageProps {
    
}

const CheckoutPage = ({}: CheckoutPageProps) => {
    return (
        <div className={s.warrper}>
            <div className={s.left}><CheckoutInfo/></div>
            <div className={s.right}><CheckoutBill data={CHECKOUT_BILL_DATA}/></div>
        </div>
    )
}

export default CheckoutPage
