import { Notification, QueryNotificationsArgs } from '@framework/schema'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import LoadingCommon from 'src/components/common/LoadingCommon/LoadingCommon'
import PaginationCommon from 'src/components/common/PaginationCommon/PaginationCommon'
import { useMarkNotificationsAsRead, useNewNotifications, useNotifications } from 'src/components/hooks/notification'
import { DEFAULT_PAGE_SIZE, QUERY_KEY, ROUTE } from 'src/utils/constanst.utils'
import { getOrderIdsFromNewNotification, getPageFromQuery } from 'src/utils/funtion.utils'
import NotificationItem from '../../../common/NotificationItem/NotificationItem'
import NotificationEmptyPage from '../NotificationEmptyPage/NotificationEmptyPage'
import s from './NotificationPage.module.scss'

interface NotificationPageProps {

}

const NotificationPage = ({ }: NotificationPageProps) => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(0)
    const btnMarkAsRead = useRef<HTMLButtonElement>(null)

    const optionQuery = useMemo(() => {
        const page = getPageFromQuery(router.query[QUERY_KEY.PAGE] as string)
        return { customOption: { skip: page * DEFAULT_PAGE_SIZE, take: DEFAULT_PAGE_SIZE } } as QueryNotificationsArgs
    }, [router.query])

    const { notifications, total, loading } = useNotifications(optionQuery)
    const { newNotifications } = useNewNotifications()
    const { markNotificationsAsRead } = useMarkNotificationsAsRead()

    useEffect(() => {
        const page = getPageFromQuery(router.query[QUERY_KEY.PAGE] as string)
        setCurrentPage(page)
    }, [router.query])

    const onPageChange = (page: number) => {
        router.push({
            pathname: ROUTE.NOTIFICATION,
            query: {
                ...router.query,
                [QUERY_KEY.PAGE]: page
            }
        },
            undefined, { shallow: true }
        )
    }

    const markAsRead = () => {
        const orderIds = getOrderIdsFromNewNotification(newNotifications || [])
        markNotificationsAsRead({ orderIds })
    }

    useEffect(() => {
        if (btnMarkAsRead.current) {
            setTimeout(() => {
                if (btnMarkAsRead.current) { // (warning) need to check again
                    btnMarkAsRead.current.click()
                }
            }, 3000)
        }
    }, [btnMarkAsRead])

    return (
        <div className={s.notificationPage}>
            <button ref={btnMarkAsRead} onClick={markAsRead} style={{ display: 'none' }}> mark as read</button>
            {
                loading ? <LoadingCommon /> : ((!notifications || notifications.length === 0) ?
                    <NotificationEmptyPage /> : <></>)
            }

            {
                notifications && <div className={s.notiListWrap}>
                    <ul className={s.notiList}>
                        {notifications.map((item: Notification) => {
                            return (
                                <NotificationItem
                                    key={item.id}
                                    id={item.id}
                                    description={item.description}
                                    createdAt={item.createdAt}
                                    updatedAt={item.updatedAt}
                                    isNew={item.isNew}
                                    order={item.order}
                                />
                            )
                        })
                        }
                    </ul>
                    {
                        notifications.length > DEFAULT_PAGE_SIZE &&
                        <div className={s.paginationWrap}>
                            < PaginationCommon
                                total={total ?? 0}
                                pageSize={DEFAULT_PAGE_SIZE}
                                defaultCurrent={currentPage}
                                onChange={onPageChange} />
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default NotificationPage
