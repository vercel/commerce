import classNames from "classnames"
import React from "react"
import s from './ReOrder.module.scss'
import Link from 'next/link'

interface ReOrderProps {
    show: boolean;
    href?: string;
}

const ReOrder = ({ show=false, href="#" } : ReOrderProps) => {
    return (
        <div className={classNames(s.reOrder, {
            [s.show]: show
        })}>
            <Link href={href}>
                <a>Re-Order</a>
            </Link>
        </div>
    )
}

export default ReOrder