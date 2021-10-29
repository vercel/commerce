import { Notification } from '@framework/schema'
import classNames from 'classnames'
import Link from 'next/link'
import { memo, useState } from 'react'
import { NotificationItem } from 'src/components/common'
import { useMarkNotificationsAsRead, useNewNotifications, useNotifications } from 'src/components/hooks/notification'
import { IconBell, IconNoti } from 'src/components/icons'
import { ROUTE } from 'src/utils/constanst.utils'
import { getOrderIdsFromNewNotification } from 'src/utils/funtion.utils'
import s from './NotificationDropdown.module.scss'

interface Props {
}

const MAX_NOTIFICATION_IN_DROPDOWN = 10
const CUSTOM_OPTION = { customOption: { take: MAX_NOTIFICATION_IN_DROPDOWN } }

const NotificationDropdown = memo(({ }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>()
  const { newNotifications } = useNewNotifications(CUSTOM_OPTION)
  const { notifications } = useNotifications(CUSTOM_OPTION)
  const { markNotificationsAsRead, loading } = useMarkNotificationsAsRead()

  const onToggleMenu = () => {
    const value = !isOpen
    setIsOpen(!isOpen)
    if (value) {
      if (newNotifications && newNotifications.length > 0 && !loading) {
        const orderIds = getOrderIdsFromNewNotification(newNotifications)
        markNotificationsAsRead({ orderIds })
      }
    }
  }

  return (
    <div className={classNames(s.notificationDropdown, { [s.show]: isOpen } )}>
      <button className={s.icon} onClick={onToggleMenu}>
        <IconNoti />
        {
          newNotifications && newNotifications?.length > 0
          && <div className={s.dot}>{newNotifications.length > 9 ? "9+" : newNotifications.length}</div>
        }

      </button>
      <div className={classNames(s.menu)}>
        <div className={s.viewAll}>
          <Link href={ROUTE.NOTIFICATION}>
            <a>
              View all
            </a>
          </Link>
        </div>
        <ul className={s.menuInner}>
          {
            (notifications && notifications.length === 0) &&
            <section className={s.empty}>
              <div className={s.emptyIcon}>
                <IconBell />
              </div>
              <div className={s.emptyContent}>
                <p>Your notification is empty</p>
              </div>
            </section>
          }
          {
            notifications?.map((item: Notification) => <NotificationItem
              key={item.id}
              id={item.id}
              description={item.description}
              createdAt={item.createdAt}
              updatedAt={item.updatedAt}
              isNew={item.isNew}
              order={item.order}
            />)
          }
        </ul>
      </div>
    </div>
  )
}
)

NotificationDropdown.displayName = 'NotificationDropdown'
export default NotificationDropdown
