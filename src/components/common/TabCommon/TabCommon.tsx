import React, { useState, RefObject, useEffect, useRef } from "react"
import s from './TabCommon.module.scss'

import TabItem from './TabItem/TabItem'

interface TabCommonProps {
    changeTab: (target:string) => void;
}

const TabCommon = ({ changeTab } : TabCommonProps) => {
    const active = "active", unActive = "";
    const [item1Active, setItem1Active] = useState(active);
    const [item2Active, setItem2Active] = useState(unActive);
    const [item3Active, setItem3Active] = useState(unActive);

    const item1 = useRef<HTMLLIElement>(null);
    const item2 = useRef<HTMLLIElement>(null);
    const item3 = useRef<HTMLLIElement>(null);
    const slider = useRef<HTMLDivElement>(null);

    function slide(ref: RefObject<HTMLLIElement>) {
        const width = ref.current.offsetWidth;
        const left = ref.current.offsetLeft; 
               
        slider.current.style.width = (width-48).toString()+"px";
        slider.current.style.left = left.toString()+"px";
    }

    function toggleItem1():void {
        setItem1Active(active)
        changeTab("waiting")

        setItem2Active(unActive)
        setItem3Active(unActive)
        slide(item1)
    }

    function toggleItem2():void {
        setItem2Active(active)
        changeTab("delivering")

        setItem1Active(unActive)
        setItem3Active(unActive)
        slide(item2)
    }
    function toggleItem3():void {
        setItem3Active(active)
        changeTab("delivered")

        setItem1Active(unActive)
        setItem2Active(unActive)
        slide(item3)
    }

    useEffect(() => {
        slide(item1);
    }, [])

    return (
        <ul className={s.tabCommon}>
            <li ref={item1}>
                <TabItem onClick={toggleItem1} active={item1Active}>Wait for Comfirmation</TabItem>
            </li>
            <li ref={item2}>
                <TabItem onClick={toggleItem2} active={item2Active}>Delivering</TabItem>
            </li>
            <li ref={item3}>
                <TabItem onClick={toggleItem3} active={item3Active}>Delivered</TabItem>
            </li>
            <div ref={slider} className={s.slider}></div>
        </ul>
    )
}

export default TabCommon;