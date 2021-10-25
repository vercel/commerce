import Link from 'next/link'
import { memo } from 'react'
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

const NotificationDropdown = memo(
  ({
  }: Props) => {
    const { newNotifications } = useNewNotifications(CUSTOM_OPTION)
    const { notifications } = useNotifications(CUSTOM_OPTION)
    const { markNotificationsAsRead } = useMarkNotificationsAsRead()
    
    const handleMouseOver = () => {
      setTimeout(() => {
        if (newNotifications && newNotifications.length > 0) {
          const orderIds = getOrderIdsFromNewNotification(newNotifications)
          markNotificationsAsRead({ orderIds })
        }
      }, 4000);
    }

    return (
      <div className={s.notificationDropdown} onMouseOver={handleMouseOver}>
        <button className={s.icon}>
          <IconNoti />
          {
            newNotifications && newNotifications?.length > 0
            && <div className={s.dot}>{newNotifications.length > 9 ? "9+" : newNotifications.length}</div>
          }

        </button>
        <div className={s.menu}>
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
              notifications?.map(item => <NotificationItem
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
