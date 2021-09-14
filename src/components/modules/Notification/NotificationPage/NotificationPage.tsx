import React from 'react'
import NotificationEmptyPage from '../NotificationEmptyPage/NotificationEmptyPage'
import NotificationItem, { NotificationItemProps } from '../NotificationItem/NotificationItem'
import {ROUTE , QUERY_KEY, ACCOUNT_TAB } from 'src/utils/constanst.utils'


interface NotificationPageProps {
    isEmpty?: boolean,
    data?: NotificationItemProps[],
}
const NOTIFICATION_DATA = [
    {
        ID: "ID33455",
        title: "Your order ID33455",
        content: "The order has been deliveried successfully!",
        date: "2 days ago",
        link: `${ROUTE.ACCOUNT}?${QUERY_KEY.TAB}=${ACCOUNT_TAB.ORDER}`,
        checked: false,
    },
    {
        ID: "ID33456",
        title: "Your order ID33456",
        content: "The order has been deliveried successfully!",
        date: "2 days ago",
        link: `${ROUTE.ACCOUNT}?${QUERY_KEY.TAB}=${ACCOUNT_TAB.ORDER}`,
        checked: false,
    },
    {
        ID: "ID33457",
        title: "Your order ID33457",
        content: "The order has been deliveried successfully!",
        date: "2 days ago",
        link: `${ROUTE.ACCOUNT}?${QUERY_KEY.TAB}=${ACCOUNT_TAB.ORDER}`,
        checked: true,
    }
]


const NotificationPage = ({ isEmpty=false, data = NOTIFICATION_DATA }: NotificationPageProps) => {
    return (
        <>
        {
        isEmpty ? 
        <NotificationEmptyPage /> 
        :
        <>
            {
                data.map(item => {
                    return (
                        <NotificationItem key={`${item.ID}-${item.title}`} title={item.title} content={item.content} date={item.date} link={item.link} checked={item.checked}/>
                    )
                })
            }
        </>
        }
        </>
    )
}

export default NotificationPage