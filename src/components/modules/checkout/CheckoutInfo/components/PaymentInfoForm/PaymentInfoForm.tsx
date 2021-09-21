import React from 'react'
import { ButtonCommon, TabCommon, TabPane } from 'src/components/common'
import { CheckOutForm } from 'src/utils/types.utils'
import BankTransfer from '../BankTransfer/BankTransfer'
import Link from 'next/link'

import s from './PaymentInfoForm.module.scss'
import CreditCardForm from '../CreditCardForm/CreditCardForm'
interface PaymentInfoFormProps {
  onConfirm?: (id: number, formInfo: CheckOutForm) => void
  id: number
}

const PaymentInfoForm = ({onConfirm,id}: PaymentInfoFormProps) => {
  const handleConfirmClick = () => {
    onConfirm && onConfirm(id,{})
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
        <div className={s.note}>
          By clicking continue you agree to Casper's{' '}
          {
            <Link href="#">
              <strong>terms and conditions</strong>
            </Link>
          }{' '}
          and{' '}
          {
            <Link href="#">
              <strong>privacy policy </strong>
            </Link>
          }
          .
        </div>
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
