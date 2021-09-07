import React from "react"
import s from './TabItem.module.scss'

interface TabItemProps {
    active: boolean;
    children: string;
    onClick: (tabIndex: number, tabPane: string) => void;
}

const TabItem = ({ active = false, children, onClick } : TabItemProps) => {

    return (
        <span onClick={onClick} className={active ? s.tabItemActive : s.tabItem} >
            {children}
        </span>
    )
}

export default TabItem;