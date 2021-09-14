import { Layout } from 'src/components/common';
import { NotificationEmptyPage, NotificationHeading, NotificationBreadcrumb } from 'src/components/modules/Notification';
export default function Demo() {
    return (
    <>
        <NotificationBreadcrumb />
        <NotificationHeading />
        <NotificationEmptyPage />
    </>
    )
}

Demo.Layout = Layout
