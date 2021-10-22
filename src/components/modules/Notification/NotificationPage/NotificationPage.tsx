import React from 'react'
import LoadingCommon from 'src/components/common/LoadingCommon/LoadingCommon'
import { useNotifications } from 'src/components/hooks/notification'
import NotificationEmptyPage from '../NotificationEmptyPage/NotificationEmptyPage'
import NotificationItem from '../NotificationItem/NotificationItem'
import s from './NotificationPage.module.scss'

interface NotificationPageProps {

}


const NotificationPage = ({ }: NotificationPageProps) => {
    const { notifications, loading } = useNotifications()
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
                    </>
            }
        </div>
    )
}

export default NotificationPage
