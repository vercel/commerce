import React, { useRef, RefObject, useEffect } from "react"
import s from './AccountNavigation.module.scss'

import AccountNavigationItem from './components/AccountNavigationItem' 

interface AccountNavigationProps {
    items: {ref: RefObject<HTMLDivElement>, active: boolean, itemName: string, onClick: (tabIndex: number)=>void}[];
    defaultActiveIndex: number;
}

const AccountNavigation = ({ items, defaultActiveIndex } : AccountNavigationProps) => {

    const sliderRef = useRef<HTMLDivElement>(null);

    function slide(index: number) {        
        const previousItem = items[index].ref.current;
        const slider = sliderRef.current;
        if (previousItem && slider) {            
            const top = previousItem.offsetTop;
            slider.style.top = top.toString()+"px";
        }
    }

    const handleClick = (item: {ref: RefObject<HTMLDivElement>, active: boolean, itemName: string, onClick: (tabIndex: number)=>void},
                        index: number) => {
        slide(index);                    
        item.onClick(index);
        
    }

    useEffect(() => {
        slide(defaultActiveIndex);
    }, [])

    return (
        <section className={s.accountNavigation}>
            {   
                items.map((item, i) => {
                    return (
                        <div key={item.itemName} ref={item.ref}>
                            <AccountNavigationItem onClick={() => {handleClick(item, i)}} active={item.active}>{item.itemName}</AccountNavigationItem>
                        </div>
                    )
                })
            }
            <div ref={sliderRef} className={s.slider}></div>
        </section>
    )
}

export default AccountNavigation