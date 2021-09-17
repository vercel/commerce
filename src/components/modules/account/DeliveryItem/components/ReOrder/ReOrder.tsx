import classNames from "classnames"
import React from "react"
import { ButtonCommon } from "src/components/common"
import Link from 'next/link'
import s from './ReOrder.module.scss'

interface ReOrderProps {
    visible: boolean;
    href?: string;
}

const ReOrder = ({ visible=false, href="#" } : ReOrderProps) => {
    return (
        <div className={classNames(s.reOrder, {
            [s.visible]: visible
        })}>
            <Link href={href}>
                <a>Re-Order</a>
            </Link>
        </div>
    )
}

export default ReOrder