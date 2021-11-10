import { Notification } from '@framework/schema'
import classNames from 'classnames'
import Link from 'next/link'
import { memo, useRef } from 'react'
import { ButtonCommon, NotificationItem } from 'src/components/common'
import { useModalAuthen } from 'src/components/contexts/ModalAuthen/ModalAuthenContext'
import { useMarkNotificationsAsRead, useNewNotifications, useNotifications } from 'src/components/hooks/notification'
import { useOnClickOutside } from 'src/components/hooks/useClickOutSide'
import { IconBell, IconNoti } from 'src/components/icons'
import { ROUTE } from 'src/utils/constanst.utils'
import { getOrderIdsFromNewNotification } from 'src/utils/funtion.utils'
import { LANGUAGE } from 'src/utils/language.utils'
import s from './NotificationDropdown.module.scss'

interface Props {
  isOpen: boolean
  toggle: () => void
  isShowLogin?: boolean
}

const MAX_NOTIFICATION_IN_DROPDOWN = 10
const CUSTOM_OPTION = { customOption: { take: MAX_NOTIFICATION_IN_DROPDOWN } }

const NotificationDropdown = memo(({ isOpen, toggle, isShowLogin }: Props) => {
  const notificationRef = useRef<HTMLDivElement>(null)
  const { newNotifications } = useNewNotifications()
  const { notifications, mutate: mutateNoti } = useNotifications(CUSTOM_OPTION)
  const { markNotificationsAsRead, loading } = useMarkNotificationsAsRead()
  const { openModalAuthen } = useModalAuthen()

  const clickOutSide = () => {
    if (isOpen) {
      toggle()
    }
  }

  useOnClickOutside(notificationRef, clickOutSide)


  const onToggleMenu = () => {
    const value = !isOpen
    toggle()
    if (value && !isShowLogin) {
      if (newNotifications && newNotifications.length > 0 && !loading) {
        const orderIds = getOrderIdsFromNewNotification(newNotifications)
        markNotificationsAsRead({ orderIds }, onMarkNotiAsReadCallBack)
      }
    }
  }

  const onMarkNotiAsReadCallBack = (isSuccess: boolean) => {
    if (isSuccess) {
      setTimeout(() => {
        mutateNoti()
      }, 1000)
    }
  }

  return (
    <div className={classNames(s.notificationDropdown, { [s.show]: isOpen })} ref={notificationRef}>
      <button className={s.icon} onClick={onToggleMenu}>
        <IconNoti />
        {
          newNotifications && newNotifications?.length > 0
          && <div className={s.dot}>{newNotifications.length > 9 ? "9+" : newNotifications.length}</div>
        }

      </button>
      <div className={classNames(s.menu)}>
        {
          isShowLogin ?
            <div className={s.messageLogin}>
              <IconBell />
              <div className={s.message}>Sign in to see notifications about your orders</div>
              <ButtonCommon onClick={openModalAuthen} size='small'>{LANGUAGE.BUTTON_LABEL.SIGNIN}</ButtonCommon>
            </div>
            : <>
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
            </>
        }

      </div>
    </div>
  )
}
)

NotificationDropdown.displayName = 'NotificationDropdown'
export default NotificationDropdown
