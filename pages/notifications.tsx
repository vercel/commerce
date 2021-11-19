import React from 'react';
import { Layout } from 'src/components/common';
import { useActiveCustomer } from 'src/components/hooks/auth';
import { AccountSignIn } from 'src/components/modules/account';
import { NotificationBreadcrumb, NotificationHeading, NotificationPage } from 'src/components/modules/Notification';

const Notification = () => {
    const { customer } = useActiveCustomer()
    if (customer) {
        return (
            <div className="spacing-horizontal">
                <NotificationBreadcrumb />
                <NotificationHeading />
                <NotificationPage />
            </div>
        )
    }
    return <AccountSignIn />


}

Notification.Layout = Layout

export default Notification;