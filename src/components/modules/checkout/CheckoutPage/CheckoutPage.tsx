import classNames from 'classnames'
import React, { useState } from 'react'
import { MessageCommon } from 'src/components/common'
import ModalAuthenticate from 'src/components/common/ModalAuthenticate/ModalAuthenticate'
import { useMessage } from 'src/components/contexts'
import { useModalAuthen } from 'src/components/contexts/ModalAuthen/ModalAuthenContext'
import { useGetActiveOrderForCheckout } from 'src/components/hooks/order'
import IconHide from 'src/components/icons/IconHide'
import { CHECKOUT_BILL_DATA } from 'src/utils/demo-data'
import { CheckoutBill, CheckoutInfo } from '..'
import s from "./CheckoutPage.module.scss"
interface CheckoutPageProps {
}

const CheckoutPage = ({ }: CheckoutPageProps) => {
    const { messages, removeMessage } = useMessage()
    const [isShow, setIsShow] = useState(false)
    const { order } = useGetActiveOrderForCheckout()
    const {modalAuthenVisible, modalAuthenMode, initialEmail, disableRedirect, closeModalAuthen } = useModalAuthen()
    const [temporaryShippingPrice, setTemporaryShippingPrice] = useState<number | null>(null)

    const onClose = () => {
        setIsShow(false)
    }
    const onViewCart = () => {
        setIsShow(true)
    }

    const onChangeTemporaryShippingPrice = (price: number | null) => {
        setTemporaryShippingPrice(price)
    }


    return (
        <div className={s.warrper}>
            <MessageCommon messages={messages} onRemove={removeMessage} />
            <ModalAuthenticate visible={modalAuthenVisible}
                closeModal={closeModalAuthen}
                mode={modalAuthenMode}
                initialEmail={initialEmail}
                disableRedirect={disableRedirect}
            />
            <div className={s.left}><CheckoutInfo onViewCart={onViewCart} currency={order?.currency.code} onChangeTemporaryShippingPrice={onChangeTemporaryShippingPrice}/></div>
            <div className={s.right}><CheckoutBill data={order} temporaryShippingPrice={temporaryShippingPrice}/></div>
            <div className={classNames({ [s.mobile]: true, [s.isShow]: isShow })}>
                <div className={s.modal}>
                    <div className={s.content}>
                        <div className={s.head}>
                            <h3>Your Cart({CHECKOUT_BILL_DATA.length})</h3>
                            <div onClick={onClose}><IconHide /></div>
                        </div>
                        <CheckoutBill data={order} temporaryShippingPrice={temporaryShippingPrice}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage
