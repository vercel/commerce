import React, { useState } from "react"
import s from './TabCommon.module.scss'

import TabItem from './TabItem/TabItem'

interface TabCommonProps {

}

const TabCommon = ({ } : TabCommonProps) => {
    const active = "active", unActive = "";

    const [item1Active, setItem1Active] = useState(active);
    const [item2Active, setItem2Active] = useState(unActive);
    const [item3Active, setItem3Active] = useState(unActive);

    function toggleItem1():void {
        setItem1Active(active)

        setItem2Active(unActive)
        setItem3Active(unActive)
    }
    function toggleItem2():void {
        setItem2Active(active)

        setItem1Active(unActive)
        setItem3Active(unActive)
    }
    function toggleItem3():void {
        setItem3Active(active)

        setItem1Active(unActive)
        setItem2Active(unActive)
    }

    return (
        <section className={s.tabCommonOutSide}>
            <div className={s.tabCommon}>
                <span onClick={toggleItem1}><TabItem active={item1Active}>Wait for Comfirmation</TabItem></span>
                <span onClick={toggleItem2}><TabItem active={item2Active}>Delivering</TabItem></span>
                <span onClick={toggleItem3}><TabItem active={item3Active}>Delivered</TabItem></span>
            </div>
        </section>
    )
}

export default TabCommon;