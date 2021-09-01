import classNames from "classnames"
import React from "react"
import s from './ReOrder.module.scss'
import Link from 'next/link'


interface ReOrderProps {
    show: string;
    href?: string;
}

const ReOrder = ({ show="", href="#" } : ReOrderProps) => {
    return (
        <div className={classNames(s.reOrder, {
            [s[show]]: show
        })}>
            <Link href={href}>
                <a>Re-Order</a>
            </Link>
        </div>
    )
}

export default ReOrder