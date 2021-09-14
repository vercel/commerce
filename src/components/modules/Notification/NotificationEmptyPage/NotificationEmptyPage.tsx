import React from 'react'
import { IconBell } from 'src/components/icons'
import s from '../NotificationEmptyPage/NotificationEmptyPage.module.scss'


const NotificationEmptyPage = () => {
    return (
        <section className={s.emptyPage}>
            <div className={s.emptyIcon}>
                <IconBell />
            </div>
            <div className={s.emptyContent}>
                <p>Your Notification is empty</p>
            </div>
        </section>
    )
}
export default NotificationEmptyPage