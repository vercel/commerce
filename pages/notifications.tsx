import React from 'react';
import { Layout } from 'src/components/common';
import { NotificationBreadcrumb, NotificationHeading, NotificationPage } from 'src/components/modules/Notification';

const Notification = () => {
    return (
        <div className="spacing-horizontal">
            <NotificationBreadcrumb />
            <NotificationHeading />
            <NotificationPage />
        </div>
    )
}

Notification.Layout = Layout

export default Notification;