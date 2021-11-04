import { PaymentMethodQuote } from '@framework/schema'
import React, { useMemo } from 'react'
import { TabCommon, TabPane } from 'src/components/common'
import { useEligiblePaymentMethods } from 'src/components/hooks/order'
import { PaymentMethod } from 'src/utils/constanst.utils'
import FormPayWithCard from './components/FormPayWithCard/FormPayWithCard'
import s from './PaymentInfoForm.module.scss'

interface PaymentInfoFormProps {
  orderId?: string
}

const isPaymentMethodEligible = (eligiblePaymentMethods: PaymentMethodQuote[], code: string) => {
  const method = eligiblePaymentMethods.find(item => item.code === code)
  return method?.isEligible
}

const PaymentInfoForm = ({ orderId }: PaymentInfoFormProps) => {
  const { eligiblePaymentMethods } = useEligiblePaymentMethods()

  const tabPanes = useMemo(() => {
    const rs = []

    if (isPaymentMethodEligible(eligiblePaymentMethods || [], PaymentMethod.Braintree)) {
      rs.push(<TabPane key="Credit Card" tabName="Credit Card">
        <div className={s.inner}><FormPayWithCard orderId={orderId} /></div>
      </TabPane>)
    }

    rs.push(<TabPane key="Ewallet" tabName="Ewallet">
      <div className={s.inner}>(In development)
      </div>
    </TabPane>)
    return rs


  }, [eligiblePaymentMethods, orderId])
  return (
    <div className={s.wrapper}>
      <TabCommon>
        {
          tabPanes.map(item => item)
        }
        
        {/* <TabPane tabName="Bank Transfer">
          <div className={s.inner}><BankTransfer /></div>
        </TabPane>
        <TabPane tabName="Credit Card (Demo)">
          <div className={s.inner}><CreditCardForm /></div>
        </TabPane> */}
      </TabCommon>
    </div>
  )
}

export default PaymentInfoForm
