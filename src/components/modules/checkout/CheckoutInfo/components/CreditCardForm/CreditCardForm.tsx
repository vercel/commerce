import React, { useRef } from 'react'
import { CheckboxCommon, Inputcommon } from 'src/components/common'
import { CustomInputCommon } from 'src/utils/type.utils'
import s from "./CreditCardForm.module.scss"
interface CreditCardFormProps {
    
}

const CreditCardForm = ({}: CreditCardFormProps) => {
    const cardNumberRef = useRef<CustomInputCommon>(null)
    const dateRef = useRef<CustomInputCommon>(null)
    const cvsRef = useRef<CustomInputCommon>(null)
    return (
        <div className={s.warpper}>
            <div className={s.body}>
                <Inputcommon type="text" placeholder="Cârd Number" ref={cardNumberRef} />
                <div className={s.line}>
                    <Inputcommon type="text" placeholder="MM/YY" ref={dateRef} />
                    <Inputcommon type="text" placeholder="CVS" ref={cvsRef} />
                </div>
            </div>
            <div className={s.checkbox}><CheckboxCommon/></div>
        </div>
    )
}

export default CreditCardForm
