import classNames from 'classnames'
import React, { useState } from 'react'
import IconHide from 'src/components/icons/IconHide'
import { CHECKOUT_BILL_DATA } from 'src/utils/demo-data'
import { CheckoutBill, CheckoutInfo } from '..'
import s from "./CheckoutPage.module.scss"
interface CheckoutPageProps {
}

const CheckoutPage = ({}: CheckoutPageProps) => {
    const [isShow, setIsShow] = useState(false)
    const onClose = () => {
        setIsShow(false)
    }
    const onViewCart =() => {
        setIsShow(true)
    }
    return (
        <div className={s.warrper}>
            <div className={s.left}><CheckoutInfo onViewCart = {onViewCart}/></div>
            <div className={s.right}><CheckoutBill data={CHECKOUT_BILL_DATA}/></div>
            <div className={classNames({ [s.mobile] :true,[s.isShow]: isShow})}>
                <div className={s.modal}>
                    <div className={s.content}>
                        <div className={s.head}>
                            <h3>Your Cart({CHECKOUT_BILL_DATA.length})</h3>
                            <div onClick={onClose}><IconHide/></div>
                        </div>
                        <CheckoutBill data={CHECKOUT_BILL_DATA}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage
