import React from 'react'
import { TabCommon, TabPane } from 'src/components/common'
import { CheckOutForm } from 'src/utils/types.utils'
import BankTransfer from '../BankTransfer/BankTransfer'

import s from "./PaymentInfoForm.module.scss"
interface PaymentInfoFormProps {
    onConfirm?: (id:number,formInfo:CheckOutForm)=>void
    id:number
}

const PaymentInfoForm = ({}: PaymentInfoFormProps) => {
    return (
        <div className="">
            <TabCommon>
                <TabPane tabName = "Bank Transfer">
                    <BankTransfer/>
                </TabPane>
                <TabPane tabName = "Bank Transfer 2">
                    <BankTransfer/>
                </TabPane>
            </TabCommon>
            
        </div>
    )
}

export default PaymentInfoForm
