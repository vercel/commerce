import classNames from "classnames"
import React from "react"
import s from './TabPane.module.scss'

interface TabPaneProps {
    active: string;
    children?: React.ReactNode;
}

const TabPane = ({ active="", children } : TabPaneProps) => {
    return (
        <section className={classNames(s.tabPane, {
            [s[active]] : active
        })}>
            {children}
        </section>
    )
}

export default TabPane