import React from 'react'
import { TabCommon, TabPane } from 'src/components/common'
import CreditCardForm from '../CreditCardForm/CreditCardForm'
import BankTransfer from './components/BankTransfer/BankTransfer'
import FormPayWithCard from './components/FormPayWithCard/FormPayWithCard'
import s from './PaymentInfoForm.module.scss'

interface PaymentInfoFormProps {
  orderId?: string
}

const PaymentInfoForm = ({ orderId }: PaymentInfoFormProps) => {
  return (
    <div className={s.wrapper}>
      <TabCommon>
        <TabPane tabName="Credit Card">
          <div className={s.inner}><FormPayWithCard  orderId={orderId}/></div>
        </TabPane>
        <TabPane tabName="Bank Transfer">
          <div className={s.inner}><BankTransfer /></div>
        </TabPane>
        <TabPane tabName="Ewallet">
          <div className={s.inner}></div>
        </TabPane>
        <TabPane tabName="Credit Card (Demo)">
          <div className={s.inner}><CreditCardForm /></div>
        </TabPane>
      </TabCommon>
    </div>
  )
}

export default PaymentInfoForm
