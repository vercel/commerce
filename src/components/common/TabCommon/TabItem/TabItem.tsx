import React, { useState } from "react"
import s from './TabItem.module.scss'

interface TabItemProps {
    active?: boolean;
    target?: any;
    children?: string;
}

const TabItem = ({ active, children } : TabItemProps) => {
    return (
        <span className={active ? s.tabItemActive : s.tabItem}>
            {children}
        </span>
    )
}

export default TabItem;