import React from 'react'
import { ButtonCommon, TabCommon, TabPane } from 'src/components/common'
import BankTransfer from '../BankTransfer/BankTransfer'
import ChekoutNotePolicy from '../ChekoutNotePolicy/ChekoutNotePolicy'
import CreditCardForm from '../CreditCardForm/CreditCardForm'
import s from './PaymentInfoForm.module.scss'

interface PaymentInfoFormProps {
  onConfirm?: (id: number) => void
  id: number
}

const PaymentInfoForm = ({onConfirm,id}: PaymentInfoFormProps) => {
  const handleConfirmClick = () => {
    onConfirm && onConfirm(id)
  }
  return (
    <div className={s.wrapper}>
      <TabCommon>
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
        <ChekoutNotePolicy/>
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
