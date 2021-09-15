import classNames from "classnames"
import React from "react"
import { ButtonCommon } from "src/components/common"
import s from './ReOrder.module.scss'

interface ReOrderProps {
    show: boolean;
}

const ReOrder = ({ show=false } : ReOrderProps) => {
    return (
        <div className={classNames(s.reOrder, {
            [s.show]: show
        })}>
            <ButtonCommon>Re-Order</ButtonCommon>
        </div>
    )
}

export default ReOrder