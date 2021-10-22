import { Notification } from '@framework/schema'
import ClassNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import { IconBill } from 'src/components/icons'
import { ACCOUNT_TAB, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils'
import s from '../NotificationItem/NotificationItem.module.scss'

export interface NotificationItemProps extends Omit<Notification, "type" | "data"> {

}

const NotificationItem = ({ description, createdAt, order, isNew }: NotificationItemProps) => {
    return (
        <section className={ClassNames({
            [s.notificationItem]: true,
            [s.isChecked]: !isNew,
        })}
        >
            <div className={s.icon}>
                <IconBill />
            </div>
            <Link href={`${ROUTE.ACCOUNT}?${QUERY_KEY.TAB}=${ACCOUNT_TAB.ORDER}`}>
                <a>
                    <div className={s.contentWrapper}>
                        <div className={s.title}>
                            Order {order?.code}
                        </div>
                        <div className={s.content}>
                            {description}
                        </div>
                        <div className={s.date}>
                            {createdAt}
                        </div>
                    </div>
                </a>
            </Link>

        </section>
    )
}

export default NotificationItem