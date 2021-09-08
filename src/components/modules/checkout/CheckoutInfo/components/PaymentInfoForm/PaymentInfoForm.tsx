import React from 'react'
import TabPane from 'src/components/common/TabCommon/components/TabPane/TabPane'
import TabCommon from 'src/components/common/TabCommon/TabCommon'
import s from "./PaymentInfoForm.module.scss"
interface PaymentInfoFormProps {
    
}

const PaymentInfoForm = ({}: PaymentInfoFormProps) => {
    return (
        <div className={s.warpper}>
            <TabCommon>
                {/* <TabPane tabName="Bank Transfer">

                </TabPane> */}
            </TabCommon>
        </div>
    )
}

export default PaymentInfoForm
