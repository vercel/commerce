import { QueryNotificationsArgs } from '@framework/schema'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
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

    useEffect(() => {

        return () => {
            if (newNotifications && newNotifications.length > 0) {
                const orderIds = getOrderIdsFromNewNotification(newNotifications)
                markNotificationsAsRead({ orderIds })
            }
        }
    }, [newNotifications, markNotificationsAsRead])


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


    if (loading) {
        return <div className={s.notificationPage}>
            <LoadingCommon />
        </div>
    }
    return (
        <div className={s.notificationPage}>
            {
                !notifications || notifications.length === 0 ?
                    <NotificationEmptyPage />
                    :
                    <>
                        {
                            notifications.map(item => {
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
                        <div className={s.paginationWrap}>
                            < PaginationCommon
                                total={total ?? 0}
                                pageSize={DEFAULT_PAGE_SIZE}
                                defaultCurrent={currentPage}
                                onChange={onPageChange} />
                        </div>
                    </>
            }
        </div>
    )
}

export default NotificationPage
