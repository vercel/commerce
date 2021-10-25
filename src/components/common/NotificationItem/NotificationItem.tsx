
import { Notification } from '@framework/schema'
import classNames from 'classnames'
import Link from 'next/link'
import { IconBill } from 'src/components/icons'
import { ACCOUNT_TAB, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils'
import { formatTimeAgo } from 'src/utils/funtion.utils'
import s from '../NotificationItem/NotificationItem.module.scss'

export interface NotificationItemProps extends Omit<Notification, "type" | "data"> {
}

const NotificationItem = ({ description, createdAt, order, isNew }: NotificationItemProps) => {
    
    return (
        <li className={classNames({
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
                            {formatTimeAgo(createdAt)}
                        </div>
                    </div>
                </a>
            </Link>

        </li>
    )
}

export default NotificationItem