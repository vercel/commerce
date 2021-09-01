import classNames from "classnames";
import React from "react"
import s from './TabItem.module.scss'

interface TabItemProps {
    active: string;
    target?: string;
    children?: string;
}

const TabItem = ({ active = "", children } : TabItemProps) => {
    return (
        <span className={classNames(s.tabItem, {
            [s[active]]: active
        })}>
            {children}
        </span>
    )
}

export default TabItem;