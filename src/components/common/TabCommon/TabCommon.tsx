import React, { RefObject, useEffect } from "react"
import s from './TabCommon.module.scss'

import TabItem from './TabItem/TabItem'

interface TabCommonProps {
    tabs: {ref:RefObject<HTMLLIElement>, tabName: string, active: boolean, onClick: (tabIndex: number, tabPane: string) => void}[];
    defaultActiveTab: number;
    sliderRef : RefObject<HTMLDivElement>;
    slideToTab: (ref: any) => void;
}

const TabCommon = ({ tabs, defaultActiveTab, sliderRef, slideToTab } : TabCommonProps) => {

    useEffect(() => {
        slideToTab(tabs[defaultActiveTab].ref);
    }, [])

    return (
        <ul className={s.tabCommon}>
            {
                tabs.map((tab) => {
                    return (
                        <li key={tab.tabName} ref={tab.ref}>
                            <TabItem onClick={tab.onClick} active={tab.active}>{tab.tabName}</TabItem>
                        </li>
                    )
                })
            }
    
            <div ref={sliderRef} className={s.slider}></div>
        </ul>
    )
}

export default TabCommon;