import React from 'react';
import { Layout } from 'src/components/common';
import { NotificationBreadcrumb, NotificationHeading, NotificationPage } from 'src/components/modules/Notification';

const Notification = () => {
    return (
        <>
            <NotificationBreadcrumb />
            <NotificationHeading />
            <NotificationPage />
        </>
    )
}

Notification.Layout = Layout

export default Notification;