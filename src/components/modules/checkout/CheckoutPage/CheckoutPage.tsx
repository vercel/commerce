import classNames from 'classnames'
import React, { useState } from 'react'
import { MessageCommon } from 'src/components/common'
import { useMessage } from 'src/components/contexts'
import { useGetActiveOrder } from 'src/components/hooks/cart'
import IconHide from 'src/components/icons/IconHide'
import { CHECKOUT_BILL_DATA } from 'src/utils/demo-data'
import { CheckoutBill, CheckoutInfo } from '..'
import s from "./CheckoutPage.module.scss"
interface CheckoutPageProps {
}

const CheckoutPage = ({ }: CheckoutPageProps) => {
    const { messages, removeMessage } = useMessage()
    const [isShow, setIsShow] = useState(false)
    const { order } = useGetActiveOrder()

    const onClose = () => {
        setIsShow(false)
    }
    const onViewCart = () => {
        setIsShow(true)
    }
    return (
        <div className={s.warrper}>
            <MessageCommon messages={messages} onRemove={removeMessage} />
            <div className={s.left}><CheckoutInfo onViewCart={onViewCart} /></div>
            <div className={s.right}><CheckoutBill data={order} /></div>
            <div className={classNames({ [s.mobile]: true, [s.isShow]: isShow })}>
                <div className={s.modal}>
                    <div className={s.content}>
                        <div className={s.head}>
                            <h3>Your Cart({CHECKOUT_BILL_DATA.length})</h3>
                            <div onClick={onClose}><IconHide /></div>
                        </div>
                        <CheckoutBill data={order} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage
