import React, {useState} from 'react'
import s from '../NotificationItem/NotificationItem.module.scss'
import ClassNames from 'classnames'
import { IconBill } from 'src/components/icons'
import Link from 'next/link'
import {ROUTE , QUERY_KEY, ACCOUNT_TAB } from 'src/utils/constanst.utils'

export interface NotificationItemProps {
    ID?: string,
    title?: string,
    content?: string,
    date?: string,
    checked?: boolean,
}

const NotificationItem = ({ ID, title, content, date, checked}: NotificationItemProps) => {
    const [isChecked, setChecked] = useState(checked)
    const Check = () => {
        setChecked(true)
    }
    return (
        <section className={ClassNames({
            [s.notificationItem] : true,
            [s.isChecked] : isChecked,
        })} 
            onClick = {Check}
        >
            <div className={s.icon}>
                <IconBill />
            </div>
            <Link href={`${ROUTE.ACCOUNT}?${QUERY_KEY.TAB}=${ACCOUNT_TAB.ORDER}`}>
                <a>
                    <div className={s.contentWrapper}>
                        <div className={s.title}>
                            {title}
                        </div>
                        <div className={s.content}>
                            {content}
                        </div>
                        <div className={s.date}>
                            {date}
                        </div>
                    </div>
                </a>
            </Link>

        </section>
    )
}

export default NotificationItem