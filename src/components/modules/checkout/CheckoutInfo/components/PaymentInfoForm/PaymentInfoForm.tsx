import React from 'react'
import { ButtonCommon, TabCommon, TabPane } from 'src/components/common'
import BankTransfer from '../BankTransfer/BankTransfer'
import ChekoutNotePolicy from '../ChekoutNotePolicy/ChekoutNotePolicy'
import CreditCardForm from '../CreditCardForm/CreditCardForm'
import FormPayWithCard from './components/FormPayWithCard/FormPayWithCard'
import s from './PaymentInfoForm.module.scss'

interface PaymentInfoFormProps {
  onConfirm?: (id: number) => void
  id: number
  orderId: string
}

const PaymentInfoForm = ({ onConfirm, id, orderId }: PaymentInfoFormProps) => {
  const handleConfirmClick = () => {
    onConfirm && onConfirm(id)
  }
  return (
    <div className={s.wrapper}>
      <TabCommon>
        <TabPane tabName="Pay With Card">
          <div className={s.inner}><FormPayWithCard  orderId={orderId}/></div>
        </TabPane>
        <TabPane tabName="Bank Transfer">
          <div className={s.inner}><BankTransfer /></div>
        </TabPane>
        <TabPane tabName="Ewallet">
          <div className={s.inner}></div>
        </TabPane>
        <TabPane tabName="Credit Card">
          <div className={s.inner}><CreditCardForm /></div>
        </TabPane>
      </TabCommon>
      <div className={s.bottom}>
        <ChekoutNotePolicy />
        <div className={s.button}>
          <ButtonCommon onClick={handleConfirmClick}>
            Submit Order
          </ButtonCommon>
        </div>
      </div>
    </div>
  )
}

export default PaymentInfoForm
