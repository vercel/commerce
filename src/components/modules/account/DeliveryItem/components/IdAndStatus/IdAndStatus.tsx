import classNames from "classnames"
import React from "react"
import s from './IdAndStatus.module.scss'


interface IdAndStatusProps {
    id?: string;
    status: "waiting" | "delivering" | "delivered";
}

const IdAndStatus = ({ id, status="waiting" } : IdAndStatusProps) => {
    return (
        <div className={s.idAndStatus}>
            <div className={s.id}>
                {id}
            </div>
            <div className={classNames(s.deliveryStatus, {
                [s[status]]: status
            })}> {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
        </div>
    )
}

export default IdAndStatus