import React from 'react';
import { Layout } from 'src/components/common';
import { NotificationBreadcrumb, NotificationPage } from 'src/components/modules/Notification';

const Notification = () => {
    return (
        <>
            <NotificationBreadcrumb />
            <NotificationPage />
        </>
    )
}

Notification.Layout = Layout

export default Notification;