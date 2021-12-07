import classNames from "classnames"
import React from "react"
import s from './IdAndStatus.module.scss'


interface IdAndStatusProps {
    code?: string;
    status?: string;
}

const IdAndStatus = ({ code, status="waiting" } : IdAndStatusProps) => {
    
    return (
        <div className={s.idAndStatus}>
            <div className={s.id}>
                {code}
            </div>
            <div className={classNames(s.deliveryStatus, {
                [s[status]]: status
            })}> {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
        </div>
    )
}

export default IdAndStatus