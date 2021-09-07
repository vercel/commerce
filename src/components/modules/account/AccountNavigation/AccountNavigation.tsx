import React, { useState, useRef, RefObject, useEffect } from "react"
import s from './AccountNavigation.module.scss'

import AccountNavigationItem from './components/AccountNavigationItem' 

interface AccountNavigationProps {
    setAccountActive: ()=>void;
    setOrderActive: ()=>void;
    setFavActive: ()=>void;
}

const AccountNavigation = ({ setAccountActive, setOrderActive, setFavActive } : AccountNavigationProps) => {
    const active = "active", unActive = "";

    const [item1Active, setItem1Active] = useState(unActive);
    const [item2Active, setItem2Active] = useState(active);
    const [item3Active, setItem3Active] = useState(unActive);

    const item1 = useRef<HTMLDivElement>(null);
    const item2 = useRef<HTMLDivElement>(null);
    const item3 = useRef<HTMLDivElement>(null);
    const slider = useRef<HTMLDivElement>(null);

    function slide(ref: RefObject<HTMLDivElement>) {        
        const top = ref.current.offsetTop;
        slider.current.style.top = top.toString()+"px";      
    }

    function toggleItem1():void {
        setItem1Active(active);
        setAccountActive();

        setItem2Active(unActive);
        setItem3Active(unActive);
        slide(item1);
    }
    function toggleItem2():void {
        setItem2Active(active);
        setOrderActive();

        setItem1Active(unActive);
        setItem3Active(unActive);
        slide(item2);
    }
    function toggleItem3():void {
        setItem3Active(active);
        setFavActive();

        setItem1Active(unActive);
        setItem2Active(unActive);
        slide(item3);
    }

    useEffect(() => {
        slide(item2);
    }, [])

    return (
        <section className={s.accountNavigation}>
            <div ref={item1}>
                <AccountNavigationItem onClick={toggleItem1} active={item1Active}>Customer Information</AccountNavigationItem>
            </div>
            <div ref={item2}>
                <AccountNavigationItem onClick={toggleItem2} active={item2Active}>Your Orders</AccountNavigationItem>
            </div>
            <div ref={item3}>
                <AccountNavigationItem onClick={toggleItem3} active={item3Active}>Favourites</AccountNavigationItem>
            </div>
            <div ref={slider} className={s.slider}></div>
        </section>
    )
}

export default AccountNavigation