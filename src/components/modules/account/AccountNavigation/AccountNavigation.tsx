import React, { useRef, useEffect, Children, ReactElement, PropsWithChildren, useState, cloneElement } from "react"
import s from './AccountNavigation.module.scss'

import AccountNavigationItem from './components/AccountNavigationItem/AccountNavigationItem'
import {TabPaneProps} from '../../../common/TabCommon/components/TabPane/TabPane'

interface AccountNavigationProps {
    defaultActiveIndex: number;
    children: React.ReactNode
}

const AccountNavigation = ({ defaultActiveIndex, children } : AccountNavigationProps) => {
    const [active, setActive] = useState(defaultActiveIndex)
    const sliderRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLUListElement>(null)

    const onTabClick = (index: number) => {
        setActive(index)
    }

    function slide(index: number) {       
        const active = headerRef.current?.children.item(index)?.getBoundingClientRect()
        const header = headerRef.current?.getBoundingClientRect()
        const current = sliderRef.current

        if (current && active && header) {
            const top = active.top;
            current.style.top = top.toString()+"px";
        }
    }

    useEffect(() => {
        slide(active);
    }, [active])

    return (
        <section className={s.accountNavigation}>
            <ul className={s.tabList} ref={headerRef}>
                {
                    Children.map(children, (tab, index) => {
                        let item = tab as ReactElement<PropsWithChildren<TabPaneProps>>
                        return (
                            <li key={item.props.tabName}>
                            <AccountNavigationItem
                                active={active === index}
                                onClick={onTabClick}
                                tabIndex={index}
                            >
                                {item.props.tabName}
                            </AccountNavigationItem>
                            </li>
                        )
                    })
                }
                <div ref={sliderRef} className={s.slider}></div>
            </ul>

            <div className={s.tabBody}>
                {
                    Children.map(children, (tab, index) => {
                        let item = tab as ReactElement<PropsWithChildren<TabPaneProps>>
                        return cloneElement(item, { active: index === active });
                    })
               }
            </div>
            <div ref={slider} className={s.slider}></div>
        </section>
    )
}

export default AccountNavigation