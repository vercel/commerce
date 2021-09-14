import { BreadcrumbCommon } from "src/components/common"
import s from './NotificationBreadcrumb.module.scss'

const NOTIFICATION_DATA = [
    {link: "/notifications", name: "Notifications"},
];

const NotificationBreadcrumb = () => {
    return (
        <section className={s.breadCrumbWrapper}>
            <BreadcrumbCommon crumbs={NOTIFICATION_DATA} showHomePage={true}/>
        </section>
    )
}

export default NotificationBreadcrumb