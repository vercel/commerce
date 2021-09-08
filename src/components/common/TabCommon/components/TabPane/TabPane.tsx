import classNames from "classnames"
import React from "react"
import s from './TabPane.module.scss'

export interface TabPaneProps {
    active: boolean;
    children?: React.ReactNode;
    tabName: string
}

const TabPane = ({ active, children } : TabPaneProps) => {
    return (
        <section className={classNames(s.tabPane, {
            [s.active] : active
        })}>
            {children}
        </section>
    )
}

export default TabPane