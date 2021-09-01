import classNames from "classnames"
import React from "react"
import s from './ReOrder.module.scss'


interface ReOrderProps {
    show: string;
    href?: string;
}

const ReOrder = ({ show="" ,href } : ReOrderProps) => {
    return (
        <div className={classNames(s.reOrder, {
            [s[show]]: show
        })}>
            Re-Order
        </div>
    )
}

export default ReOrder