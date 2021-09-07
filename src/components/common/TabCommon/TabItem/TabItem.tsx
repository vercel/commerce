import classNames from "classnames";
import React from "react"
import s from './TabItem.module.scss'

interface TabItemProps {
    active: string;
    children: string;
    onClick: () => void;
}

const TabItem = ({ active = "", children, onClick } : TabItemProps) => {

    return (
        <span onClick={onClick} className={classNames(s.tabItem, {
            [s[active]]: active
        })}>
            {children}
        </span>
    )
}

export default TabItem;